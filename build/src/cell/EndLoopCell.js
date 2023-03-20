"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EndLoopCell = void 0;
const BaseCell_1 = require("./BaseCell");
const exceljs_1 = require("exceljs");
/* tslint:disable:variable-name */
class EndLoopCell extends BaseCell_1.BaseCell {
    static match(cell) {
        return (cell &&
            cell.type === exceljs_1.ValueType.String &&
            typeof cell.value === 'string' &&
            cell.value.substring(0, 11) === '#! END_LOOP');
    }
    apply(scope) {
        super.apply(scope);
        const target = scope.getCurrentTemplateString().split(' ')[2];
        const __start = scope.vm[target] && scope.vm[target].__start; // todo refactoring: simplify by using question mark
        const __iterated = scope.vm[target] && scope.vm[target].__iterated;
        scope.unfreezeOutput();
        const __insertRows = true;
        scope.vm[target] = Object.freeze({
            ...scope.vm[target],
            __end: scope.templateCell,
            __insetRows: __insertRows,
            __insertRows,
        });
        if (__start && !__iterated) {
            scope.templateCell = __start;
        }
        else {
            scope.incrementRow();
        }
        return this;
    }
}
exports.EndLoopCell = EndLoopCell;
//# sourceMappingURL=EndLoopCell.js.map