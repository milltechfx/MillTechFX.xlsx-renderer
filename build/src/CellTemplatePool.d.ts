import { Cell } from 'exceljs';
import { BaseCell, CellType } from './cell/BaseCell';
export declare class CellTemplatePool {
    protected cells: CellType[];
    protected instances: Map<CellType, BaseCell>;
    match(cell: Cell): BaseCell;
}
