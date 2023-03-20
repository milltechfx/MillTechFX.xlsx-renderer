import { BaseCell } from './BaseCell';
import { Scope } from '../Scope';
import { Cell } from 'exceljs';
import { ICellCoord } from '../ICellCoord';
/**
 * Pattern: `#! FOR_EACH [TARGET] [SOURCE]`
 * Iterate through `vm[SOURCE]` and store current item in readonly `vm[TARGET]`.
 * `vm[TARGET]` has additional fields:
 *
 * * `__from` - keeps `SOURCE` parameter's value
 * * `__index` - current 1-based iteration index (`vm[TARGET]` is `vm[SOURCE][__index-1]`)
 * * `__start` - template foreach start cell
 * * `__end` - template loop's end cell, it is undefined before first `END_LOOP`
 * * `__iterated` - iteration has been finished
 * * `__last` - is this last element of a collection
 * * `__insertRows` - second and next iterations have to insert new rows
 * * `__startOutput` - first output cell
 * * `__endOutput` - last output cell
 * * `__last` - boolean if it is last element of collection - useful for: `#! FINISH item.__last`
 */
export declare class ForEachCell extends BaseCell {
    static match(cell: Cell): boolean;
    protected static getTargetParam(scope: Scope): string;
    protected static shiftMergedCells(__end: ICellCoord, __start: ICellCoord, scope: Scope): void;
    apply(scope: Scope): ForEachCell;
    protected getSourceParam(scope: Scope): string;
}
