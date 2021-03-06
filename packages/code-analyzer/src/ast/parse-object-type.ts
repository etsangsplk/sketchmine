import { ParseLocation } from './parse-location';
import { AstVisitor } from './ast-visitor';
import { ParseReferenceType } from './parse-reference-type';

export class ParseObjectType extends ParseReferenceType {
  constructor(location: ParseLocation, name: string) {
    super(location, name);
  }

  visit(visitor: AstVisitor): any {
    return visitor.visitArrayType(this);
  }
}
