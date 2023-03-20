import { BaseCell } from './BaseCell';
import { Scope } from '../Scope';
import { Cell } from 'exceljs';
export declare class HyperlinkCell extends BaseCell {
    static match(cell: Cell): boolean;
    protected static getLabelParam(scope: Scope): string;
    protected static getUrlParam(scope: Scope): string;
    apply(scope: Scope): HyperlinkCell;
}
