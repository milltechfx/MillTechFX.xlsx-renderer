import { BaseCell } from './BaseCell';
import { Cell } from 'exceljs';
import { Scope } from '../Scope';
/**
 * @description
 * TemplateStringCellinterpolate string and put it into cell as a string value
 * * starts width <pre>#` </pre>
 */
export declare class TemplateStringCell extends BaseCell {
    static match(cell: Cell): boolean;
    apply(scope: Scope): TemplateStringCell;
}
