"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EndRowCell = void 0;
const BaseCell_1 = require("./BaseCell");
const exceljs_1 = require("exceljs");
class EndRowCell extends BaseCell_1.BaseCell {
    static match(cell) {
        return (cell &&
            cell.type === exceljs_1.ValueType.String &&
            typeof cell.value === 'string' &&
            cell.value === '#! END_ROW');
    }
    apply(scope) {
        super.apply(scope);
        scope.setCurrentOutputValue(null);
        scope.incrementRow();
        return this;
    }
}
exports.EndRowCell = EndRowCell;
//# sourceMappingURL=EndRowCell.js.map