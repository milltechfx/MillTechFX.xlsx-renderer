import { BaseCell } from './BaseCell';
import { Cell } from 'exceljs';
import { Scope } from '../Scope';
/**
 * @description
 * TemplateFormulaCell interpolate string and put it into cell as a formula
 * * starts width `#= `
 */
export declare class TemplateFormulaCell extends BaseCell {
    static match(cell: Cell): boolean;
    apply(scope: Scope): TemplateFormulaCell;
}
