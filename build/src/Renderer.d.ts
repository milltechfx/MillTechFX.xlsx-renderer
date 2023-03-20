import { Workbook } from 'exceljs';
import { CellTemplatePool } from './CellTemplatePool';
export declare class Renderer {
    private cellTemplatePool;
    constructor(cellTemplatePool?: CellTemplatePool);
    render(templateFactory: () => Promise<Workbook>, vm: unknown): Promise<Workbook>;
    renderFromFile(templatePath: string, viewModel: unknown): Promise<Workbook>;
    renderFromArrayBuffer(templateArrayBuffer: ArrayBuffer, viewModel: unknown): Promise<Workbook>;
}
