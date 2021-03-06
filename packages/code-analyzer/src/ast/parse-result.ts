import { ParseNode } from './parse-node';
import { ParseLocation } from './parse-location';
import { AstVisitor } from './ast-visitor';
import { ParseDependency } from './parse-dependency';

export class ParseResult extends ParseNode {
  constructor(
    location: ParseLocation,
    public nodes: ParseNode[],
    public dependencyPaths: ParseDependency[],
  ) {
    super(location);
  }

  visit(visitor: AstVisitor): any {
    return visitor.visitResult(this);
  }
}
