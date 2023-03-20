"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormulaCell = void 0;
const BaseCell_1 = require("./BaseCell");
const exceljs_1 = require("exceljs");
class FormulaCell extends BaseCell_1.BaseCell {
    static match(cell) {
        return cell && cell.type === exceljs_1.ValueType.Formula;
    }
    apply(scope) {
        super.apply(scope);
        const shift = scope.outputCell.r - scope.templateCell.r;
        const regex = /([a-zA-Z]+)([1-9][0-9]*)/g;
        const value = scope.getCurrentTemplateValue();
        let formula = value.formula;
        // todo extract method match addresses
        const addresses = [];
        while (true) {
            const matches = regex.exec(formula);
            if (matches === null) {
                break;
            }
            addresses.push({
                index: matches.index,
                col: matches[1],
                row: +matches[2],
                len: matches[0].length,
            });
        }
        addresses.reverse();
        // todo extract method getShiftedFormula
        const formulaChars = Array.from(formula);
        addresses.forEach(a => formulaChars.splice(a.index, a.len, `${a.col}${a.row + shift}`));
        formula = formulaChars.join('');
        scope.setCurrentOutputValue({ formula });
        scope.incrementCol();
        return this;
    }
}
exports.FormulaCell = FormulaCell;
//# sourceMappingURL=FormulaCell.js.map