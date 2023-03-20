import { BaseCell } from './BaseCell';
import { Cell } from 'exceljs';
import { Scope } from '../Scope';
export declare class DumpColsCell extends BaseCell {
    static match(cell: Cell): boolean;
    apply(scope: Scope): DumpColsCell;
}
