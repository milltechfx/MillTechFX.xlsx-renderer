import {Cell, CellValue, Workbook} from 'exceljs';
import {parseJSON, isValid, format, parse} from 'date-fns';
// TODO fix exceljs index.d.ts -> it provides only an interface Range (@see https://github.com/Siemienik/xlsx-renderer/issues/44)
// @ts-ignore
import Range from 'exceljs/lib/doc/range';
import {ViewModel} from './ViewModel';
import {ICellCoord} from './ICellCoord';

export class Scope {
  public outputCell: ICellCoord = Object.freeze({r: 1, c: 1, ws: 0});

  public templateCell: ICellCoord = Object.freeze({r: 1, c: 1, ws: 0});

  private frozen = 0;

  private finished = false;

  constructor(
    public template: Workbook,
    public output: Workbook,
    public vm: ViewModel
  ) {}

  public getCurrentTemplateString(): string {
    return this.getCurrentTemplateValue()?.toString() || '';
  }

  public getCurrentTemplateValue(): CellValue {
    return this.getCurrentTemplateCell().value;
  }

  public getCurrentTemplateCell(): Cell {
    return this.template.worksheets[this.templateCell.ws].getCell(
      this.templateCell.r,
      this.templateCell.c
    );
  }

  public removeCurrentCell(): void {
    const ct = this.templateCell;
    const wst = this.template.worksheets[ct.ws];
    const co = this.outputCell;
    const wso = this.output.worksheets[co.ws];
    wst.getRow(ct.r).splice(ct.c, 1);
    wso.getRow(co.r).splice(co.c, 1);
  }

  public mergeRowCells(startColumn: number): void {
    const co = this.outputCell;
    const wso = this.output.worksheets[co.ws];
    const rowIndex = co.r;
    wso.mergeCells(rowIndex, startColumn, rowIndex, co.c);
  }

  private isDateFormat(formatString: string) {
    const dateString = format(new Date(), formatString);
    try {
      return isValid(parse(dateString, formatString, new Date()));
    } catch (e) {
      return false;
    }
  }

  public setCurrentOutputValue(value: CellValue): void {
    if (this.frozen) {
      return;
    }

    const curentCell = this.output.worksheets[this.outputCell.ws].getCell(
      this.outputCell.r,
      this.outputCell.c
    );

    // in case we have a date represented as string (e.g got converted to string by JSON.stringify)
    // and we have a date format applyed in the excel cell (numFmt)
    // then we should parse and set the value as Date in the cell so that the excel applies the date format
    if (
      value &&
      typeof value === 'string' &&
      curentCell.numFmt &&
      this.isDateFormat(curentCell.numFmt) &&
      isValid(parseJSON(value))
    ) {
      curentCell.value = parseJSON(value);
    } else {
      curentCell.value = value;
    }
  }

  public applyStyles(): void {
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

  public applyMerge(): void {
    // TODO refactor names
    const tws = this.template.worksheets[this.templateCell.ws];
    const tc = tws.getCell(this.templateCell.r, this.templateCell.c);

    const ows = this.output.worksheets[this.outputCell.ws];

    if (tc.isMerged && tc.address === (tc.master && tc.master.address)) {
      // TODO fix ts-ignore ( @see https://github.com/Siemienik/xlsx-renderer/issues/46 )
      // @ts-ignore
      let {top, bottom} = tws._merges[tc.master.address];
      // TODO fix ts-ignore ( @see https://github.com/Siemienik/xlsx-renderer/issues/46 )
      // @ts-ignore
      const {left, right} = tws._merges[tc.master.address];
      const verticalShift = this.outputCell.r - top;
      top += verticalShift;
      bottom += verticalShift;
      // TODO fix ts-ignore ( @see https://github.com/Siemienik/xlsx-renderer/issues/46 )
      // @ts-ignore
      const range = new Range(top, left, bottom, right).shortRange;
      ows.unMergeCells(range);
      ows.mergeCells(range);
    }
  }

  public incrementCol(): void {
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

  public incrementRow(): void {
    if (!this.finished) {
      this.templateCell = Object.freeze({
        ...this.templateCell,
        r: this.templateCell.r + 1,
        c: 1,
      });
    }

    if (this.frozen) {
      this.outputCell = Object.freeze({...this.outputCell, c: 1});
    } else {
      this.outputCell = Object.freeze({
        ...this.outputCell,
        r: this.outputCell.r + 1,
        c: 1,
      });
    }
  }

  public freezeOutput(): void {
    this.frozen++;
  }

  public unfreezeOutput(): void {
    this.frozen = Math.max(this.frozen - 1, 0);
  }

  public isFrozen(): boolean {
    return this.frozen > 0;
  }

  public finish(): void {
    this.finished = true;
    this.unfreezeOutput();
  }

  public isFinished(): boolean {
    return this.finished;
  }

  public isOutOfColLimit(): boolean {
    return this.outputCell.c > 16383;
  }
}
