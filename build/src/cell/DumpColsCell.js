"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DumpColsCell = void 0;
const BaseCell_1 = require("./BaseCell");
const exceljs_1 = require("exceljs");
class DumpColsCell extends BaseCell_1.BaseCell {
    static match(cell) {
        return (cell &&
            cell.type === exceljs_1.ValueType.String &&
            typeof cell.value === 'string' &&
            cell.value.substring(0, 12) === '#! DUMP_COLS');
    }
    apply(scope) {
        super.apply(scope);
        const path = scope.getCurrentTemplateString().substring(13).split('.');
        const cols = Array.from(path).reduce((p, c) => p[c] || [], scope.vm);
        scope.setCurrentOutputValue(null);
        cols.forEach((x) => {
            scope.setCurrentOutputValue(x);
            scope.applyStyles();
            scope.outputCell = Object.freeze({
                ...scope.outputCell,
                c: scope.outputCell.c + 1,
            });
        });
        scope.incrementCol();
        return this;
    }
}
exports.DumpColsCell = DumpColsCell;
//# sourceMappingURL=DumpColsCell.js.map