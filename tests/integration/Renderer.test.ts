import {CellTemplateDebugPool} from '../../src/CellTemplateDebugPool';
import {Renderer} from '../../src/Renderer';
import * as fs from 'fs';
import {Dirent} from 'fs';
import * as path from 'path';
import {Anchor, Workbook, Worksheet} from 'exceljs';
import * as chai from 'chai';

// TODO: it works for node 10+, for node 8/9 see git history
function isDir(dirPath: Dirent): boolean {
  return dirPath.isDirectory();
}

function getSimplestImages(x: Worksheet) {
  return x.getImages().map(({imageId, range}) => {
    /**
     * TODO remove casting in the future
     * @see https://github.com/Siemienik/xlsx-renderer/pull/31#discussion_r446581091
     */
    const br = range.br as Anchor;
    const tl = range.tl as Anchor;

    return {
      imageId,
      brc: br.nativeCol,
      brcf: br.nativeColOff,
      brr: br.nativeRow,
      brrf: br.nativeRowOff,
      tlc: tl.nativeCol,
      tlcf: tl.nativeColOff,
      tlr: tl.nativeRow,
      tlrf: tl.nativeRowOff,
    };
  });
}

function assertCells(expected: Workbook, result: Workbook, factor = 10) {
  chai.expect(expected.worksheets.length).eql(result.worksheets.length);
  chai
    .expect(expected.worksheets.map(x => x.name))
    .eql(result.worksheets.map(x => x.name));
  chai
    .expect(expected.worksheets.map(getSimplestImages))
    .eql(result.worksheets.map(getSimplestImages));

  for (let wi = 0; wi < expected.worksheets.length; wi++) {
    const ws = {e: expected.worksheets[wi], r: result.worksheets[wi]};
    for (let i = 0; i < factor * factor; i++) {
      const r = Math.floor(i / factor) + 1;
      const c = (i % factor) + 1;
      const cell = {
        e: ws.e.getCell(r, c),
        r: ws.r.getCell(r, c),
      };

      if (r === 1) {
        chai.expect(ws.r.getColumn(c).width).eql(ws.e.getColumn(c).width);
      }
      if (c === 1) {
        chai.expect(ws.r.getRow(r).height).eql(ws.e.getRow(r).height);
      }

      chai.expect(cell.r.style).eql(cell.e.style);
      // TODO report bug, about merge cell which isn't a master. cell.text in that case throw error : `TypeError: Cannot read property 'toString' of null` (@see https://github.com/Siemienik/xlsx-renderer/issues/47)
      // TODO add to exceljs isMaster (@see https://github.com/exceljs/exceljs/issues/1400)
      // TODO update exceljs index.d.ts about cell.s (it misses cellvalues classes def) (@see https://github.com/Siemienik/xlsx-renderer/issues/44)
      if (!cell.r.isMerged || cell.r.address === cell.r.master.address) {
        // TODO after exceljs fix (@see https://github.com/Siemienik/xlsx-renderer/issues/47)
        if (!cell.e.isMerged || cell.e.address === cell.e.master.address) {
          // TODO after exceljs fix (@see https://github.com/Siemienik/xlsx-renderer/issues/47)
          chai.expect(cell.r.text).eql(cell.e.text);
        }
      }
      chai.expect(cell.r.value).eql(cell.e.value);
    }
  }
}

async function safe(cb: (...a: unknown[]) => void) {
  try {
    cb();
  } catch (e) {
    // tslint:disable-next-line:no-console
    console.warn(e);
  }
}

describe('INTEGRATION:: Test xlsx renderer ', () => {
  it('check safe utility', async () => {
    const {warn} = console;

    let called = 0;
    // tslint:disable-next-line:no-console
    console.warn = () => {
      called++;
    };

    // tslint:disable-next-line:no-empty
    safe(() => {});
    chai.expect(0).equal(called);

    safe(() => {
      throw new Error();
    });
    chai.expect(1).equal(called);

    // tslint:disable-next-line:no-console
    console.warn = warn;
  });
  describe('Checking if assertCells works ok.', () => {
    it('Same - should pass ok', async () => {
      const expected = await new Workbook().xlsx.readFile(
        path.join(__dirname, 'data', 'assertCells', 'main.xlsx')
      );
      const correct = await new Workbook().xlsx.readFile(
        path.join(__dirname, 'data', 'assertCells', 'correct.xlsx')
      );
      const expectedImage = await new Workbook().xlsx.readFile(
        path.join(__dirname, 'data', 'assertCells', 'main-image.xlsx')
      );
      const correctImage = await new Workbook().xlsx.readFile(
        path.join(__dirname, 'data', 'assertCells', 'correct-image.xlsx')
      );
      // TODO important probably lack of assertions images assertion!

      assertCells(expected, correct, 20);
    });

    it('Different - attempt to broke assertions', async () => {
      const expected = await new Workbook().xlsx.readFile(
        path.join(__dirname, 'data', 'assertCells', 'main.xlsx')
      );
      const failedHeight = await new Workbook().xlsx.readFile(
        path.join(__dirname, 'data', 'assertCells', 'f-height.xlsx')
      );
      const failedStyle = await new Workbook().xlsx.readFile(
        path.join(__dirname, 'data', 'assertCells', 'f-style.xlsx')
      );
      const failedTable = await new Workbook().xlsx.readFile(
        path.join(__dirname, 'data', 'assertCells', 'f-table.xlsx')
      );
      const failedText = await new Workbook().xlsx.readFile(
        path.join(__dirname, 'data', 'assertCells', 'f-text.xlsx')
      );
      const failedValue = await new Workbook().xlsx.readFile(
        path.join(__dirname, 'data', 'assertCells', 'f-value.xlsx')
      );
      const failedWidth = await new Workbook().xlsx.readFile(
        path.join(__dirname, 'data', 'assertCells', 'f-width.xlsx')
      );
      const failedWorksheetAmount = await new Workbook().xlsx.readFile(
        path.join(__dirname, 'data', 'assertCells', 'f-ws-amount.xlsx')
      );
      const failedWorksheetNames = await new Workbook().xlsx.readFile(
        path.join(__dirname, 'data', 'assertCells', 'f-ws-names.xlsx')
      );

      chai
        .expect(() => assertCells(expected, failedHeight, 20))
        .throw('expected 34.5 to deeply equal 15');
      chai
        .expect(() => assertCells(expected, failedStyle, 20))
        .throw(
          'expected { font: { size: 11, …(4) }, …(2) } to deeply equal { font: { size: 11, …(4) }, …(2) }'
        );
      chai
        .expect(() => assertCells(expected, failedTable, 20))
        .throw(
          'expected { font: { size: 11, …(4) }, …(2) } to deeply equal { font: { size: 11, …(4) }, …(2) }'
        );
      chai
        .expect(() => assertCells(expected, failedText, 20))
        .throw("expected 'sadas' to deeply equal 'sadasd'");
      chai
        .expect(() => assertCells(expected, failedValue, 20))
        .throw(
          "expected 'asdasda' to deeply equal { formula: '\"asdasda\"', …(1) }"
        );
      chai
        .expect(() => assertCells(expected, failedWidth, 20))
        .throw('expected 7.90625 to deeply equal 13');
      chai
        .expect(() => assertCells(expected, failedWorksheetAmount, 20))
        .throw('expected 2 to deeply equal 3');
      chai
        .expect(() => assertCells(expected, failedWorksheetNames, 20))
        .throw(
          "expected [ 'Sheet1', 'Sheet2' ] to deeply equal [ 'Sheet1', 'Sheet3' ]"
        );

      const expectedImage = await new Workbook().xlsx.readFile(
        path.join(__dirname, 'data', 'assertCells', 'main-image.xlsx')
      );
      const failedImage = await new Workbook().xlsx.readFile(
        path.join(__dirname, 'data', 'assertCells', 'f-image.xlsx')
      );
      chai
        .expect(() => assertCells(expectedImage, failedImage, 20))
        .throw('expected [ …(2) ] to deeply equal [ …(2) ]');
    });
  });
  describe('Load examples, render and compare with expected result', () => {
    const dataPath = path.normalize(path.join(__dirname, 'data/'));
    const sets = fs
      .readdirSync(path.normalize(dataPath), {withFileTypes: true})
      .filter(d => isDir(d) && /^Renderer[0-9]*-/.test(d.name));

    sets.forEach(file => {
      it(`Test for  ${file.name}`, async () => {
        const renderer = new Renderer();
        const viewModelOriginal = require(path.join(
          dataPath,
          file.name,
          'viewModel.json'
        ));
        const viewModel = JSON.parse(JSON.stringify(viewModelOriginal));

        const result = await renderer.renderFromFile(
          path.join(dataPath, file.name, 'template.xlsx'),
          viewModel
        );

        // viewModel shouldn't be modified. @see https://github.com/Siemienik/XToolset/issues/137
        chai.expect(viewModel).eql(viewModelOriginal);

        const expected = await new Workbook().xlsx.readFile(
          path.join(dataPath, file.name, 'expected.xlsx')
        );

        await safe(async () => {
          await result.xlsx.writeFile(
            path.join(dataPath, file.name, 'test-output.xlsx')
          );
        });

        assertCells(expected, result);
      });
    });

    const fixture = sets[5].name;
    it(`Test for ArrayBuffer import from ${fixture} with a debug`, async () => {
      const renderer = new Renderer(new CellTemplateDebugPool());
      const viewModelOriginal = require(path.join(
        dataPath,
        fixture,
        'viewModel.json'
      ));
      const viewModel = JSON.parse(JSON.stringify(viewModelOriginal));

      const result = await renderer.renderFromArrayBuffer(
        fs.readFileSync(path.join(dataPath, fixture, 'template.xlsx')),
        viewModel
      );

      // viewModel shouldn't be modified. @see https://github.com/Siemienik/XToolset/issues/137
      chai.expect(viewModel).eql(viewModelOriginal);

      const expected = await new Workbook().xlsx.readFile(
        path.join(dataPath, fixture, 'expected.xlsx')
      );

      await safe(async () => {
        await result.xlsx.writeFile(
          path.join(dataPath, fixture, 'test-output.xlsx')
        );
      });

      assertCells(expected, result);
    });
  });
});
