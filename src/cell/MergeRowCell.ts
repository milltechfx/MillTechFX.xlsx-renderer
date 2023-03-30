import * as log from 'lambda-log';

import {BaseCell} from './BaseCell';
import {Cell, ValueType} from 'exceljs';
import {Scope} from '../Scope';

export class MergeRowCell extends BaseCell {
  public static match(cell: Cell): boolean {
    return (
      cell &&
      cell.type === ValueType.String &&
      typeof cell.value === 'string' &&
      cell.value.substring(0, 17) === '#! MERGE_ROW_CELL'
    );
  }

  public apply(scope: Scope): MergeRowCell {
    super.apply(scope);

    const startColumnPath = scope
      .getCurrentTemplateString()
      .substring(18)
      .split('.');
    const startColumn = startColumnPath.reduce(
      (p, c) => (typeof p === 'object' ? p[c] : p),
      scope.vm
    );

    if (startColumn === undefined && !scope.isFrozen()) {
      log.warn(`${startColumnPath} is undefined for`, {
        outputCell: scope.outputCell,
        templateCell: scope.templateCell,
      });
    }

    scope.mergeRowCells(parseInt(startColumn));
    scope.incrementCol();

    return this;
  }
}
