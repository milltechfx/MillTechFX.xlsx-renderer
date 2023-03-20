import { BaseCell } from './BaseCell';
import { Cell } from 'exceljs';
import { Scope } from '../Scope';
export declare class DeleteCell extends BaseCell {
    static match(cell: Cell): boolean;
    apply(scope: Scope): DeleteCell;
}
