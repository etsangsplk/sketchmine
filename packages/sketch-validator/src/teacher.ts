import { SketchObjectTypes } from '@sketchmine/sketch-file-format';
import { IValidationContext, IValidationRule } from './interfaces/validation-rule.interface';
import { ErrorHandler } from './error/error-handler';
import { ValidationError } from './error/validation-error';

/**
 * The teacher that applies the rules to the homeworks.
 */
export class Teacher {

  constructor(
    private _rules: IValidationRule[],
    private handler: ErrorHandler,
  ) { }

  improve(homework: IValidationContext[]) {
    for (let i = 0, max = homework.length; i < max; i += 1) {
      this.applyCorrection(homework, i);
    }
  }

  private applyCorrection(homework: IValidationContext[], currentTask: number) {
    const task = homework[currentTask];
    const specification = this._rules.find(rule => rule.selector.includes(task._class as SketchObjectTypes));

    if (!specification) {
      return;
    }

    const marks:(ValidationError | boolean)[] = specification.validation
      .call(null, homework, currentTask);

    if (marks instanceof Array) {
      marks.forEach((mark) => {
        if (mark === true) {
          this.handler.addSuccess(specification);
        } else if (mark instanceof ValidationError) {
          mark.description = specification.description;
          mark.parents = task.parents;
          this.handler.addError(specification, mark);
        }
      });
    }
  }
}
