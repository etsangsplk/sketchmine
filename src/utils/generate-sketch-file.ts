import { bytesToSize } from '@sketch-draw/helpers/util';
import { createDir } from '@utils/create-dir';
import { fileBuffer } from '@utils/zip-to-buffer';
import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
const archiver = require('archiver');

/**
 * Generate a .sketch file from a local folder or an array of fileBuffers
 * @param outDir string
 * @param fileName string – without .sketch
 * @param content Buffer[] | string
 * @returns Promise<void | Error> to check when the sketch file was generated.
 */
export function generateSketchFile(
  outDir: string,
  fileName: string,
  content: fileBuffer[] | string,
): Promise<void | Error> {
  return new Promise((resolve, reject) => {
    createDir(outDir);
    const file = path.resolve(outDir, `${fileName}.sketch`);
    const output = fs.createWriteStream(file);
    const archive = archiver('zip');

    if (process.env.DEBUG) {
      console.log(chalk`\tCreated Write Stream for {grey ${file}}`);
    }

    output.on('close',  () => {
      console.log(
        chalk`\n✅ \t{greenBright Sketch file}: {magenta ${fileName}.sketch} – `,
        chalk`was successfully generated with: {cyan ${bytesToSize(archive.pointer())}}\n`,
        chalk`\tIn the folder: {grey ${path.resolve(outDir)}/}\n\n`,
      );
      resolve();
    });

    archive.on('warning', (err) => {
      if (err.code === 'ENOENT') {
        if (process.env.DEBUG) {
          console.log('Sketch-File could not be written: ENOENT', err);
        }
      } else {
        reject(err);
      }
    });

    archive.on('error', (err) => {
      reject(err);
    });

    archive.pipe(output);

    if (content instanceof  Array) {
      content.forEach((file: fileBuffer) => {
        archive.append(file.buffer, { name: file.path });
      });
    } else {
      archive.directory(content, false);
    }

    archive.finalize();
  });
}