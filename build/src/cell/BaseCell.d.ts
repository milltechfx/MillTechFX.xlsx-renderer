import { Cell } from 'exceljs';
import { Scope } from '../Scope';
export declare type CellType = typeof BaseCell;
export declare class BaseCell {
    /**
     * check if this commend can parse `value`
     */
    static match(cell: Cell): boolean;
    protected static isMasterCell(scope: Scope): boolean;
    constructor();
    apply(scope: Scope): BaseCell;
}
