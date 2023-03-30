import * as log from 'lambda-log';
import {CellTemplatePool} from './CellTemplatePool';
import {Cell} from 'exceljs';
import {BaseCell} from './cell/BaseCell';

export class CellTemplateDebugPool extends CellTemplatePool {
  /**
   * do normal match and log in console result.
   */
  public match(cell: Cell): BaseCell {
    const result = super.match(cell);

    log.debug('matched', {
      fullAddress: cell?.fullAddress,
      value: cell?.value,
      result,
    });

    return result;
  }
}
