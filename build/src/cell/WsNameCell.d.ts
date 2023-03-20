import { BaseCell } from './BaseCell';
import { Cell } from 'exceljs';
import { Scope } from '../Scope';
export declare class WsNameCell extends BaseCell {
    static match(cell: Cell): boolean;
    protected static _getName(scope: Scope): string;
    protected static _getTargetValue(scope: Scope): any;
    protected static _getTarget(scope: Scope): string;
    apply(scope: Scope): WsNameCell;
}
