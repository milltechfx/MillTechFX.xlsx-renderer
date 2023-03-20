"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseCell = void 0;
class BaseCell {
    // can't be abstract :(
    /**
     * check if this commend can parse `value`
     */
    static match(cell) {
        return false;
    }
    static isMasterCell(scope) {
        const templateCell = scope.template.worksheets[scope.templateCell.ws].getCell(scope.templateCell.r, scope.templateCell.c);
        return !(templateCell &&
            templateCell.isMerged &&
            templateCell.master &&
            templateCell.master.address !== templateCell.address);
    }
    constructor() {
        if (this.constructor.name !== 'BaseCell') {
            return;
        }
        // can't be marked by abstract keyword, so it throw type error.
        throw new TypeError(`Cannot construct ${BaseCell.name} instances directly. It's abstract.`);
    }
    apply(scope) {
        if (scope.isOutOfColLimit()) {
            scope.finish(); // todo important: spec test
        }
        if (BaseCell.isMasterCell(scope)) {
            scope.setCurrentOutputValue(scope.getCurrentTemplateValue());
            scope.applyStyles();
        }
        scope.applyMerge();
        return this;
    }
}
exports.BaseCell = BaseCell;
//# sourceMappingURL=BaseCell.js.map