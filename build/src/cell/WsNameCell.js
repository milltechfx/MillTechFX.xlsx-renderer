"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WsNameCell = void 0;
const BaseCell_1 = require("./BaseCell");
const exceljs_1 = require("exceljs");
class WsNameCell extends BaseCell_1.BaseCell {
    static match(cell) {
        return (cell &&
            cell.type === exceljs_1.ValueType.String &&
            typeof cell.value === 'string' &&
            cell.value.substring(0, 10) === '#! WS_NAME');
    }
    static _getName(scope) {
        let name = WsNameCell._getTargetValue(scope) || WsNameCell._getTarget(scope);
        name = name.replace(/[\\\/*\[\]?]/g, '.');
        if (scope.output.worksheets.find(x => x.name === name)) {
            name += ` ${scope.outputCell.ws}`;
        }
        name = name.length > 31 ? name.substr(name.length - 31) : name;
        return name;
    }
    static _getTargetValue(scope) {
        return WsNameCell._getTarget(scope)
            .split('.')
            .reduce((p, c) => p[c] || '', scope.vm);
    }
    static _getTarget(scope) {
        return scope.getCurrentTemplateString().split(' ')[2];
    }
    apply(scope) {
        super.apply(scope);
        scope.setCurrentOutputValue(null);
        scope.output.worksheets[scope.outputCell.ws].name =
            WsNameCell._getName(scope);
        scope.incrementCol();
        return this;
    }
}
exports.WsNameCell = WsNameCell;
//# sourceMappingURL=WsNameCell.js.map