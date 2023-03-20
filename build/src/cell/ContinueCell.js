"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContinueCell = void 0;
const ForEachCell_1 = require("./ForEachCell");
const exceljs_1 = require("exceljs");
class ContinueCell extends ForEachCell_1.ForEachCell {
    static match(cell) {
        return (cell &&
            cell.type === exceljs_1.ValueType.String &&
            typeof cell.value === 'string' &&
            cell.value.substring(0, 11) === '#! CONTINUE');
    }
    getSourceParam(scope) {
        const target = ForEachCell_1.ForEachCell.getTargetParam(scope);
        return scope.vm[target] && scope.vm[target].__from;
    }
}
exports.ContinueCell = ContinueCell;
//# sourceMappingURL=ContinueCell.js.map