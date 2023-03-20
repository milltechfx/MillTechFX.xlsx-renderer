"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CellTemplateDebugPool = void 0;
const CellTemplatePool_1 = require("./CellTemplatePool");
/* tslint:disable:no-console */
class CellTemplateDebugPool extends CellTemplatePool_1.CellTemplatePool {
    /**
     * do normal match and log in console result.
     */
    match(cell) {
        const result = super.match(cell);
        console.log(cell?.fullAddress, result, cell?.value);
        return result;
    }
}
exports.CellTemplateDebugPool = CellTemplateDebugPool;
//# sourceMappingURL=CellTemplateDebugPool.js.map