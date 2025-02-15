import * as log from 'lambda-log';
import {BaseCell} from './BaseCell';
import {Cell, ValueType} from 'exceljs';
import {Scope} from '../Scope';

export class VariableCell extends BaseCell {
  public static match(cell: Cell): boolean {
    return (
      cell &&
      cell.type === ValueType.String &&
      (cell.isMerged ? cell.master.address === cell.address : true) &&
      typeof cell.value === 'string' &&
      cell.value.substring(0, 2) === '##'
    );
  }

  public apply(scope: Scope) {
    super.apply(scope);

    const path = scope.getCurrentTemplateString().substring(3).split('.');

    // todo refactoring extract, similar like in TemplateFormulaCell
    const value = path.reduce(
      (p, c) => (typeof p === 'object' ? p[c] : p),
      scope.vm
    );
    if (value === undefined && !scope.isFrozen()) {
      log.warn(
        `WARN: ${path} is undefined for output: ${JSON.stringify(
          scope.outputCell
        )} when template is:${JSON.stringify(scope.templateCell)}`
      );
    }
    scope.setCurrentOutputValue(value);
    scope.incrementCol();

    return this;
  }
}
