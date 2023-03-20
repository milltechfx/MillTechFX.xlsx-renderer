"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AverageCell = void 0;
const BaseCell_1 = require("./BaseCell");
const exceljs_1 = require("exceljs");
/* tslint:disable:variable-name */
class AverageCell extends BaseCell_1.BaseCell {
    static match(cell) {
        return (cell &&
            cell.type === exceljs_1.ValueType.String &&
            typeof cell.value === 'string' &&
            cell.value.substring(0, 10) === '#! AVERAGE' // todo refactoring: make utils that made this simply (here and in other cell's match functions
        );
    }
    static getTargetParam(scope) {
        return scope.getCurrentTemplateString().split(' ')[2];
    }
    apply(scope) {
        super.apply(scope);
        const target = AverageCell.getTargetParam(scope);
        const __startOutput = scope.vm[target] && scope.vm[target].__startOutput;
        const __endOutput = scope.vm[target] && scope.vm[target].__endOutput;
        if (__startOutput && __endOutput) {
            const start = scope.output.worksheets[scope.outputCell.ws].getCell(__startOutput, scope.outputCell.c).address; // todo refactoring
            const end = scope.output.worksheets[scope.outputCell.ws].getCell(__endOutput, scope.outputCell.c).address; // todo refactoring
            scope.setCurrentOutputValue({
                formula: `average(${start}:${end})`,
            });
        }
        scope.incrementCol();
        return this;
    }
}
exports.AverageCell = AverageCell;
//# sourceMappingURL=AverageCell.js.map