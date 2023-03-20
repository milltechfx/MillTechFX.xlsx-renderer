import { Cell, CellValue, Workbook } from 'exceljs';
import { ViewModel } from './ViewModel';
import { ICellCoord } from './ICellCoord';
export declare class Scope {
    template: Workbook;
    output: Workbook;
    vm: ViewModel;
    outputCell: ICellCoord;
    templateCell: ICellCoord;
    private frozen;
    private finished;
    constructor(template: Workbook, output: Workbook, vm: ViewModel);
    getCurrentTemplateString(): string;
    getCurrentTemplateValue(): CellValue;
    getCurrentTemplateCell(): Cell;
    setCurrentOutputValue(value: CellValue): void;
    applyStyles(): void;
    applyMerge(): void;
    incrementCol(): void;
    incrementRow(): void;
    freezeOutput(): void;
    unfreezeOutput(): void;
    isFrozen(): boolean;
    finish(): void;
    isFinished(): boolean;
    isOutOfColLimit(): boolean;
}
