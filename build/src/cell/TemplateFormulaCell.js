"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateFormulaCell = void 0;
const BaseCell_1 = require("./BaseCell");
const exceljs_1 = require("exceljs");
const variableRegex = /\${[^{]+?}/g;
/**
 * @description
 * TemplateFormulaCell interpolate string and put it into cell as a formula
 * * starts width `#= `
 */
class TemplateFormulaCell extends BaseCell_1.BaseCell {
    static match(cell) {
        return (cell &&
            cell.type === exceljs_1.ValueType.String &&
            (cell.isMerged ? cell.master.address === cell.address : true) &&
            typeof cell.value === 'string' &&
            cell.value.substring(0, 3) === '#= ');
    }
    apply(scope) {
        super.apply(scope);
        const template = scope.getCurrentTemplateString().substring(3);
        const formula = template.replace(variableRegex, match => {
            const path = match.slice(2, -1).split('.');
            // todo refactoring extract, similar like in VariableCell
            const value = path.reduce((p, c) => (typeof p === 'object' ? p[c] : p), scope.vm);
            if (value === undefined && !scope.isFrozen()) {
                // todo do it better (use logger or something like that)
                // tslint:disable-next-line:no-console
                console.warn(`WARN: ${path} is undefined for template formula output: ${JSON.stringify(scope.outputCell)} when template is:${JSON.stringify(scope.templateCell)}`);
            }
            return value;
        });
        scope.setCurrentOutputValue({ formula });
        scope.incrementCol();
        return this;
    }
}
exports.TemplateFormulaCell = TemplateFormulaCell;
//# sourceMappingURL=TemplateFormulaCell.js.map