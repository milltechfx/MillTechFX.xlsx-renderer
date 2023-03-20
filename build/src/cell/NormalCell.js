"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NormalCell = void 0;
const exceljs_1 = require("exceljs");
const BaseCell_1 = require("./BaseCell");
class NormalCell extends BaseCell_1.BaseCell {
    /**
     * @inheritDoc
     * @param {Cell} cell
     * @returns {boolean}
     */
    static match(cell) {
        return (cell &&
            cell.type === exceljs_1.ValueType.String &&
            typeof cell.value === 'string' &&
            !['##', '#!', '#=', '#`'].includes(cell.value.substring(0, 2)) // todo documentation: describe prefixes in a documentation
        );
    }
    /**
     * @inheritDoc
     * @param {Scope} scope
     * @returns {NormalCell}
     */
    apply(scope) {
        super.apply(scope);
        scope.incrementCol();
        return this;
    }
}
exports.NormalCell = NormalCell;
//# sourceMappingURL=NormalCell.js.map