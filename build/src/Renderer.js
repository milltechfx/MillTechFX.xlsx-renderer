"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Renderer = void 0;
const exceljs_1 = require("exceljs");
const Scope_1 = require("./Scope");
const CellTemplatePool_1 = require("./CellTemplatePool");
class Renderer {
    constructor(cellTemplatePool = new CellTemplatePool_1.CellTemplatePool()) {
        this.cellTemplatePool = cellTemplatePool;
    }
    async render(templateFactory, vm) {
        const template = await templateFactory();
        const output = await templateFactory();
        // todo Temporary fixation for VM mutating problem, @see https://github.com/Siemienik/XToolset/issues/137
        const vmCopy = JSON.parse(JSON.stringify(vm));
        const scope = new Scope_1.Scope(template, output, vmCopy);
        while (!scope.isFinished()) {
            this.cellTemplatePool.match(scope.getCurrentTemplateCell()).apply(scope);
        }
        return output;
    }
    async renderFromFile(templatePath, viewModel) {
        const result = await this.render(async () => {
            const template = new exceljs_1.Workbook();
            return await template.xlsx.readFile(templatePath);
        }, viewModel);
        return await result;
    }
    async renderFromArrayBuffer(templateArrayBuffer, viewModel) {
        const result = await this.render(async () => {
            const template = new exceljs_1.Workbook();
            return await template.xlsx.load(templateArrayBuffer);
        }, viewModel);
        return await result;
    }
}
exports.Renderer = Renderer;
//# sourceMappingURL=Renderer.js.map