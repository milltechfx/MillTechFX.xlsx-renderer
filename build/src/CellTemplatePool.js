"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CellTemplatePool = void 0;
const NormalCell_1 = require("./cell/NormalCell");
const TemplateFormulaCell_1 = require("./cell/TemplateFormulaCell");
const TemplateStringCell_1 = require("./cell/TemplateStringCell");
const VariableCell_1 = require("./cell/VariableCell");
const FinishCell_1 = require("./cell/FinishCell");
const ForEachCell_1 = require("./cell/ForEachCell");
const ContinueCell_1 = require("./cell/ContinueCell");
const EndLoopCell_1 = require("./cell/EndLoopCell");
const EndRowCell_1 = require("./cell/EndRowCell");
const SumCell_1 = require("./cell/SumCell");
const AverageCell_1 = require("./cell/AverageCell");
const DeleteCell_1 = require("./cell/DeleteCell");
const DumpColsCell_1 = require("./cell/DumpColsCell");
const WsNameCell_1 = require("./cell/WsNameCell");
const HyperlinkCell_1 = require("./cell/HyperlinkCell");
const FormulaCell_1 = require("./cell/FormulaCell");
class CellTemplatePool {
    constructor() {
        this.cells = [
            NormalCell_1.NormalCell,
            EndRowCell_1.EndRowCell,
            VariableCell_1.VariableCell,
            TemplateStringCell_1.TemplateStringCell,
            TemplateFormulaCell_1.TemplateFormulaCell,
            FormulaCell_1.FormulaCell,
            HyperlinkCell_1.HyperlinkCell,
            ForEachCell_1.ForEachCell,
            FinishCell_1.FinishCell,
            EndLoopCell_1.EndLoopCell,
            ContinueCell_1.ContinueCell,
            DumpColsCell_1.DumpColsCell,
            SumCell_1.SumCell,
            AverageCell_1.AverageCell,
            WsNameCell_1.WsNameCell,
            DeleteCell_1.DeleteCell,
        ];
        this.instances = new Map();
    }
    match(cell) {
        const type = this.cells.find(x => x.match(cell)) || NormalCell_1.NormalCell;
        if (!this.instances.has(type)) {
            this.instances.set(type, new type());
        }
        return this.instances.get(type);
    }
}
exports.CellTemplatePool = CellTemplatePool;
//# sourceMappingURL=CellTemplatePool.js.map