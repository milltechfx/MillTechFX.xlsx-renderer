import * as log from 'lambda-log';

import {BaseCell} from './BaseCell';
import {Cell, ValueType} from 'exceljs';
import {Scope} from '../Scope';

export class ShowCell extends BaseCell {
  public static match(cell: Cell): boolean {
    return (
      cell &&
      cell.type === ValueType.String &&
      typeof cell.value === 'string' &&
      cell.value.substring(0, 12) === '#! SHOW_CELL'
    );
  }

  public apply(scope: Scope): ShowCell {
    super.apply(scope);

    const [showPath, targetPath] = scope
      .getCurrentTemplateString()
      .substring(13)
      .split(' ');

    let show = showPath
      .split('.')
      .reduce((p, c) => (typeof p === 'object' ? p[c] : p), scope.vm);

    // if we don't set a show path then it means we want to show the cell
    if (show === undefined) {
      show = true;
    }

    const value = targetPath
      .split('.')
      .reduce((p, c) => (typeof p === 'object' ? p[c] : p), scope.vm);

    if (value === undefined && !scope.isFrozen()) {
      log.warn(`${targetPath} is undefined for`, {
        outputCell: scope.outputCell,
        templateCell: scope.templateCell,
      });
    }

    if (show) {
      scope.setCurrentOutputValue(value);
      scope.incrementCol();
    } else {
      scope.removeCurrentCell();
    }

    return this;
  }
}
