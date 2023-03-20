"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HyperlinkCell = void 0;
const BaseCell_1 = require("./BaseCell");
const exceljs_1 = require("exceljs");
class HyperlinkCell extends BaseCell_1.BaseCell {
    static match(cell) {
        return (cell &&
            cell.type === exceljs_1.ValueType.String &&
            typeof cell.value === 'string' &&
            cell.value.substring(0, 12) === '#! HYPERLINK');
    }
    static getLabelParam(scope) {
        return scope.getCurrentTemplateString().split(' ')[2];
    }
    static getUrlParam(scope) {
        return scope.getCurrentTemplateString().split(' ')[3];
    }
    apply(scope) {
        super.apply(scope);
        scope.setCurrentOutputValue(null);
        const url = HyperlinkCell.getUrlParam(scope)
            .split('.')
            .reduce((p, c) => p[c] || {}, scope.vm);
        if (typeof url === 'string') {
            const label = HyperlinkCell.getLabelParam(scope)
                .split('.')
                .reduce((p, c) => p[c] || {}, scope.vm) || url;
            scope.setCurrentOutputValue({ text: label, hyperlink: url });
        }
        scope.incrementCol();
        return this;
    }
}
exports.HyperlinkCell = HyperlinkCell;
//# sourceMappingURL=HyperlinkCell.js.map