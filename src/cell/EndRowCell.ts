import {BaseCell} from './BaseCell';
import {Cell, ValueType} from 'exceljs';
import {Scope} from '../Scope';

export class EndRowCell extends BaseCell {
  public static match(cell: Cell): boolean {
    return (
      cell &&
      cell.type === ValueType.String &&
      typeof cell.value === 'string' &&
      cell.value.substring(0, 10) === '#! END_ROW'
    );
  }

  public apply(scope: Scope): EndRowCell {
    const ignoreStyle =
      scope.getCurrentTemplateString().split(' ')[2] === 'true';
    if (ignoreStyle) {
      scope.freezeOutput();
    }

    super.apply(scope);

    if (ignoreStyle) {
      scope.unfreezeOutput();
    }

    scope.setCurrentOutputValue(null);
    scope.incrementRow();

    return this;
  }
}
