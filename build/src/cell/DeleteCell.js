"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCell = void 0;
const BaseCell_1 = require("./BaseCell");
const exceljs_1 = require("exceljs");
class DeleteCell extends BaseCell_1.BaseCell {
    static match(cell) {
        return (cell &&
            cell.type === exceljs_1.ValueType.String &&
            typeof cell.value === 'string' &&
            cell.value.substring(0, 9) === '#! DELETE');
    }
    apply(scope) {
        super.apply(scope);
        const target = scope.getCurrentTemplateString().split(' ')[2];
        if (target !== undefined) {
            scope.vm[target] = undefined;
        }
        scope.setCurrentOutputValue(null);
        scope.incrementCol();
        return this;
    }
}
exports.DeleteCell = DeleteCell;
//# sourceMappingURL=DeleteCell.js.map