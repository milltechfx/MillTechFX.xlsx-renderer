import { BaseCell } from './BaseCell';
import { Scope } from '../Scope';
import { Cell } from 'exceljs';
export declare class SumCell extends BaseCell {
    static match(cell: Cell): boolean;
    protected static getTargetParam(scope: Scope): string;
    apply(scope: Scope): SumCell;
}
