import {BaseCell} from './BaseCell';
import {Cell, ValueType} from 'exceljs';
import {Scope} from '../Scope';

export class DumpEmptyColsCell extends BaseCell {
  public static match(cell: Cell): boolean {
    return (
      cell &&
      cell.type === ValueType.String &&
      typeof cell.value === 'string' &&
      cell.value.substring(0, 18) === '#! DUMP_EMPTY_COLS'
    );
  }

  public apply(scope: Scope): DumpEmptyColsCell {
    super.apply(scope);

    const path = scope.getCurrentTemplateString().substring(19).split('.');
    const colsLength = path.reduce((p, c) => p[c] || 0, scope.vm);

    for (let i = 0; i < colsLength; i++) {
      scope.setCurrentOutputValue(null);
      scope.applyStyles();

      if (i < colsLength - 1) {
        scope.outputCell = Object.freeze({
          ...scope.outputCell,
          c: scope.outputCell.c + 1,
        });
      }
    }

    scope.incrementCol();

    return this;
  }
}
