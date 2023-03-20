"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scope = void 0;
// TODO fix exceljs index.d.ts -> it provides only an interface Range (@see https://github.com/Siemienik/xlsx-renderer/issues/44)
// @ts-ignore
const range_1 = __importDefault(require("exceljs/lib/doc/range"));
class Scope {
    constructor(template, output, vm) {
        this.template = template;
        this.output = output;
        this.vm = vm;
        this.outputCell = Object.freeze({ r: 1, c: 1, ws: 0 });
        this.templateCell = Object.freeze({ r: 1, c: 1, ws: 0 });
        this.frozen = 0;
        this.finished = false;
    }
    getCurrentTemplateString() {
        return this.getCurrentTemplateValue()?.toString() || '';
    }
    getCurrentTemplateValue() {
        return this.getCurrentTemplateCell().value;
    }
    getCurrentTemplateCell() {
        return this.template.worksheets[this.templateCell.ws].getCell(this.templateCell.r, this.templateCell.c);
    }
    setCurrentOutputValue(value) {
        if (this.frozen) {
            return;
        }
        this.output.worksheets[this.outputCell.ws].getCell(this.outputCell.r, this.outputCell.c).value = value;
    }
    applyStyles() {
        if (this.frozen) {
            return;
        }
        // TODO refactor names
        const ct = this.templateCell;
        const wst = this.template.worksheets[ct.ws];
        const co = this.outputCell;
        const wso = this.output.worksheets[co.ws];
        wso.getRow(co.r).height = wst.getRow(ct.r).height;
        wso.getCell(co.r, co.c).style = wst.getCell(ct.r, ct.c).style;
        if (wst.getColumn(ct.c).isCustomWidth) {
            wso.getColumn(co.c).width = wst.getColumn(ct.c).width;
        }
    }
    applyMerge() {
        // TODO refactor names
        const tws = this.template.worksheets[this.templateCell.ws];
        const tc = tws.getCell(this.templateCell.r, this.templateCell.c);
        const ows = this.output.worksheets[this.outputCell.ws];
        if (tc.isMerged && tc.address === (tc.master && tc.master.address)) {
            // TODO fix ts-ignore ( @see https://github.com/Siemienik/xlsx-renderer/issues/46 )
            // @ts-ignore
            let { top, bottom } = tws._merges[tc.master.address];
            // TODO fix ts-ignore ( @see https://github.com/Siemienik/xlsx-renderer/issues/46 )
            // @ts-ignore
            const { left, right } = tws._merges[tc.master.address];
            const verticalShift = this.outputCell.r - top;
            top += verticalShift;
            bottom += verticalShift;
            // TODO fix ts-ignore ( @see https://github.com/Siemienik/xlsx-renderer/issues/46 )
            // @ts-ignore
            const range = new range_1.default(top, left, bottom, right).shortRange;
            ows.unMergeCells(range);
            ows.mergeCells(range);
        }
    }
    incrementCol() {
        if (!this.finished) {
            this.templateCell = Object.freeze({
                ...this.templateCell,
                c: this.templateCell.c + 1,
            });
        }
        this.outputCell = Object.freeze({
            ...this.outputCell,
            c: this.outputCell.c + 1,
        });
    }
    incrementRow() {
        if (!this.finished) {
            this.templateCell = Object.freeze({
                ...this.templateCell,
                r: this.templateCell.r + 1,
                c: 1,
            });
        }
        if (this.frozen) {
            this.outputCell = Object.freeze({ ...this.outputCell, c: 1 });
        }
        else {
            this.outputCell = Object.freeze({
                ...this.outputCell,
                r: this.outputCell.r + 1,
                c: 1,
            });
        }
    }
    freezeOutput() {
        this.frozen++;
    }
    unfreezeOutput() {
        this.frozen = Math.max(this.frozen - 1, 0);
    }
    isFrozen() {
        return this.frozen > 0;
    }
    finish() {
        this.finished = true;
        this.unfreezeOutput();
    }
    isFinished() {
        return this.finished;
    }
    isOutOfColLimit() {
        return this.outputCell.c > 16383;
    }
}
exports.Scope = Scope;
//# sourceMappingURL=Scope.js.map