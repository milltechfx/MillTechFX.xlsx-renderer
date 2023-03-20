import { BaseCell } from './BaseCell';
import { Cell } from 'exceljs';
import { Scope } from '../Scope';
export declare class FinishCell extends BaseCell {
    static match(cell: Cell): boolean;
    /**
     * Rendering should finish when:
     * * condition params isn't set
     * * condition's path follow to undefined
     * * condition is true
     * In other way, the same template sheet should render next output sheet - as long as condition is false
     */
    protected static getCondition(scope: Scope): boolean;
    apply(scope: Scope): FinishCell;
}
