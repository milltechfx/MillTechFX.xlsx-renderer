import { BaseCell } from './BaseCell';
import { Cell } from 'exceljs';
import { Scope } from '../Scope';
export declare class FormulaCell extends BaseCell {
    static match(cell: Cell): boolean;
    apply(scope: Scope): FormulaCell;
}
