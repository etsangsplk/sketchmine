import { join, resolve, dirname } from 'path';
import { ParseResult, AstVisitor } from './ast';
import { adjustPathAliases, readTsConfig } from './utils';
import { ReferenceResolver } from './reference-resolver';
import { writeJSON } from '@sketchmine/node-helpers';
import { ValuesResolver } from './values-resolver';
import { parseFile } from './parse-file';
import { renderASTtoJSON } from './render-ast-to-json';
import { Result as MetaResult } from './meta-information';
/**
 * The Main function that takes command line args build the AST and transforms the AST,
 * generate a JSON representation from it and write it to the outFile.
 * @param {string[]} args Array of command line args
 * @returns {Promise<number>} returns a promise with the exit code
 */
export async function main(
  rootDir: string,
  library: string,
  outFile: string = 'meta-information.json',
  inFile: string = 'index.ts',
  tsConfig: string = 'tsconfig.json',
  inMemory: boolean = false,
): Promise<number | MetaResult> {

  if (!rootDir || !library) {
    throw new Error('The --rootDir and the --library, to the angular components has to be specified!');
  }

  const pkg = resolve(rootDir, 'package.json');
  const tsconfig = resolve(rootDir, tsConfig);
  const nodeModules = join(dirname(pkg), 'node_modules');
  const entryFile = resolve(rootDir, library, inFile);
  let parseResults = new Map<string, ParseResult>();

  const config = await readTsConfig(tsconfig);
  parseFile(entryFile, adjustPathAliases(config, join(rootDir, library)), parseResults, nodeModules);

  const results = Array.from(parseResults.values());

  /** list of transformers that got applied on the AST */
  const transformers: AstVisitor[] = [
    new ReferenceResolver(results),
    new ValuesResolver(),
  ];
  /** applies the transformers on the AST */
  for (const transformer of transformers) {
    const transformedResults = new Map<string, ParseResult>();
    parseResults.forEach((result, fileName) => {
      transformedResults.set(fileName, result.visit(transformer));
    });
    parseResults = transformedResults;
  }
  const metaInformation = renderASTtoJSON(parseResults, pkg);

  if (inMemory) {
    return metaInformation;
  }
  /** write the JSON structure to the outFile */
  await writeJSON(outFile, metaInformation, false);

  // return exit code
  return 0;
}
