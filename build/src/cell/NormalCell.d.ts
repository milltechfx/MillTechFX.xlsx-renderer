import { Cell } from 'exceljs';
import { BaseCell } from './BaseCell';
import { Scope } from '../Scope';
export declare class NormalCell extends BaseCell {
    /**
     * @inheritDoc
     * @param {Cell} cell
     * @returns {boolean}
     */
    static match(cell: Cell): boolean;
    /**
     * @inheritDoc
     * @param {Scope} scope
     * @returns {NormalCell}
     */
    apply(scope: Scope): NormalCell;
}
