import { CellTemplatePool } from './CellTemplatePool';
import { Cell } from 'exceljs';
import { BaseCell } from './cell/BaseCell';
export declare class CellTemplateDebugPool extends CellTemplatePool {
    /**
     * do normal match and log in console result.
     */
    match(cell: Cell): BaseCell;
}
