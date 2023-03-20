import { ForEachCell } from './ForEachCell';
import { Cell } from 'exceljs';
import { Scope } from '../Scope';
export declare class ContinueCell extends ForEachCell {
    static match(cell: Cell): boolean;
    getSourceParam(scope: Scope): string;
}
