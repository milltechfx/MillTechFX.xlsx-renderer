"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariableCell = void 0;
const BaseCell_1 = require("./BaseCell");
const exceljs_1 = require("exceljs");
class VariableCell extends BaseCell_1.BaseCell {
    static match(cell) {
        return (cell &&
            cell.type === exceljs_1.ValueType.String &&
            (cell.isMerged ? cell.master.address === cell.address : true) &&
            typeof cell.value === 'string' &&
            cell.value.substring(0, 2) === '##');
    }
    apply(scope) {
        super.apply(scope);
        const path = scope.getCurrentTemplateString().substring(3).split('.');
        // todo refactoring extract, similar like in TemplateFormulaCell
        const value = path.reduce((p, c) => (typeof p === 'object' ? p[c] : p), scope.vm);
        if (value === undefined && !scope.isFrozen()) {
            // todo do it better (use logger or somethink like that)
            // tslint:disable-next-line:no-console
            console.warn(`WARN: ${path} is undefined for output: ${JSON.stringify(scope.outputCell)} when template is:${JSON.stringify(scope.templateCell)}`);
        }
        scope.setCurrentOutputValue(value);
        scope.incrementCol();
        return this;
    }
}
exports.VariableCell = VariableCell;
//# sourceMappingURL=VariableCell.js.map