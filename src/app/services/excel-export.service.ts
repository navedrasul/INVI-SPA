import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs/dist/exceljs.min.js';
import * as fs from 'file-saver';
import { Item } from '../models/item';
import { DataStorageService } from './data-storage.service';
import { merge } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExcelExportService {

  items: Item[];

  totalWithoutDiscount = 0;
  discount = 0;
  total = 0;

  constructor(
    private dataSvc: DataStorageService
  ) { }

  public generateExcelFile() {
    this.updateValues();

    const workbook = new Workbook();

    workbook.creator = 'INVI';
    workbook.lastModifiedBy = 'INVI';
    workbook.created = workbook.modified = new Date();
    // Set workbook dates to 1904 date system
    workbook.properties.date1904 = true;

    // Force workbook calculation on load
    workbook.calcProperties.fullCalcOnLoad = true;

    workbook.views = [
      {
        x: 0, y: 0, width: 10000, height: 20000,
        firstSheet: 0, activeTab: 1, visibility: 'visible'
      }
    ];

    // create new sheet with pageSetup settings for A4 - landscape
    const worksheet = workbook.addWorksheet('Invoice', {
      pageSetup: { paperSize: 9, orientation: 'portrait' }
    });

    // Add column headers and define column keys and widths
    // Note: these column structures are a workbook-building convenience only,
    // apart from the column width, they will not be fully persisted.
    // worksheet.columns = [
    //   { header: 'Id', key: 'id', width: 10 },
    //   { header: 'Name', key: 'name', width: 32 },
    //   { header: 'D.O.B.', key: 'DOB', width: 10, outlineLevel: 1 }
    // ];

    let rowNo = 1;

    let curRow = worksheet.addRow(['INVOICE']);
    curRow.height = 40;
    curRow.font = {
      size: 25
    };
    curRow.alignment = {
      vertical: 'middle',
      horizontal: 'center'
    };
    let mergeCellsRange = `A${rowNo}:D${rowNo}`;
    worksheet.mergeCells(mergeCellsRange);

    rowNo++;

    let curCell = worksheet.getCell(`A${rowNo}`);
    curCell.value = workbook.created;
    curCell.numFmt = 'mmm dd yyyy, HH:MM';
    curCell.font = {
      size: 10,
      bold: true
    };
    curCell.alignment = {
      vertical: 'middle',
      horizontal: 'center'
    };
    curCell.border = { bottom: { style: 'thick' } };
    mergeCellsRange = `A${rowNo}:D${rowNo}`;
    worksheet.mergeCells(mergeCellsRange);

    let rowVals = [];
    rowVals[1] = 'Item';
    rowVals[4] = 'Price';
    curRow = worksheet.addRow(rowVals);

    rowNo++;

    curCell = worksheet.getCell(`A${rowNo}`);
    curCell.font = {
      size: 10,
      bold: true
    };
    curCell.border = { bottom: { style: 'thick' } };
    mergeCellsRange = `A${rowNo}:C${rowNo}`;
    worksheet.mergeCells(mergeCellsRange);

    curCell = worksheet.getCell(`D${rowNo}`);
    curCell.font = {
      size: 10,
      bold: true
    };
    curCell.border = { bottom: { style: 'thick' } };

    rowNo++;

    for (let idx = 0; idx < this.items.length; idx++, rowNo += 2) {
      const item = this.items[idx];
      // const rowNo = 4 + 2 * idx;

      rowVals = [];
      rowVals[1] = item.name;
      rowVals[4] = '$' + item.price;
      curRow = worksheet.addRow(rowVals);

      curCell = worksheet.getCell('A' + rowNo);
      curCell.font = {
        size: 10
      };
      mergeCellsRange = 'A' + rowNo + ':C' + rowNo;
      worksheet.mergeCells(mergeCellsRange);

      curCell = worksheet.getCell('D' + rowNo);
      curCell.font = {
        size: 10,
        bold: true
      };
      curCell.alignment = { vertical: 'middle', horizontal: 'center' };
      curCell.border = {
        bottom: {
          // Thick border for the last item row and thin for the rest.
          style: (idx < this.items.length - 1) ? 'thin' : 'thick'
        }
      };

      rowVals = [];
      rowVals[1] = '5 bags x $13 - $3';
      curRow = worksheet.addRow(rowVals);

      curCell = worksheet.getCell(`A${rowNo + 1}`);
      curCell.font = {
        size: 10,
        bold: true
      };
      curCell.alignment = { horizontal: 'right' };
      curCell.border = {
        bottom: {
          // Thick border for the last item row and thin for the rest.
          style: (idx < this.items.length - 1) ? 'thin' : 'thick'
        }
      };
      mergeCellsRange = `A${rowNo + 1}:C${rowNo + 1}`;
      worksheet.mergeCells(mergeCellsRange);

      mergeCellsRange = `D${rowNo}:D${rowNo + 1}`;
      worksheet.mergeCells(mergeCellsRange);
    }

    // rowVals = [];
    // rowVals[1] = 'Item A';
    // rowVals[4] = '$62';
    // curRow = worksheet.addRow(rowVals);

    // curCell = worksheet.getCell('A4');
    // curCell.font = {
    //   size: 10
    // };
    // worksheet.mergeCells('A4:C4');

    // curCell = worksheet.getCell('D4');
    // curCell.font = {
    //   size: 10,
    //   bold: true
    // };
    // curCell.alignment = { vertical: 'middle', horizontal: 'center' };
    // curCell.border = { bottom: { style: 'thin' } };

    // rowVals = [];
    // rowVals[1] = '5 bags x $13 - $3';
    // curRow = worksheet.addRow(rowVals);

    // curCell = worksheet.getCell('A5');
    // curCell.font = {
    //   size: 10,
    //   bold: true
    // };
    // curCell.alignment = { horizontal: 'right' };
    // curCell.border = { bottom: { style: 'thin' } };
    // worksheet.mergeCells('A5:C5');

    // worksheet.mergeCells('D4:D5');


    // rowVals = [];
    // rowVals[1] = 'Item B';
    // rowVals[4] = '$5145';
    // curRow = worksheet.addRow(rowVals);

    // curCell = worksheet.getCell('A6');
    // curCell.font = {
    //   size: 10
    // };
    // worksheet.mergeCells('A6:C6');

    // curCell = worksheet.getCell('D6');
    // curCell.font = {
    //   size: 10,
    //   bold: true
    // };
    // curCell.alignment = {
    //   vertical: 'middle',
    //   horizontal: 'center'
    // };
    // curCell.border = { bottom: { style: 'thick' } };

    // rowVals = [];
    // rowVals[1] = '5 bags x $13 - $3';
    // curRow = worksheet.addRow(rowVals);

    // curCell = worksheet.getCell('A7');
    // curCell.font = {
    //   size: 10,
    //   bold: true
    // };
    // curCell.alignment = { horizontal: 'right' };
    // curCell.border = { bottom: { style: 'thick' } };
    // worksheet.mergeCells('A7:C7');

    // worksheet.mergeCells('D6:D7');


    // let rowNo = 4 + 2 * (this.items.length - 1);

    rowVals = [];
    rowVals[1] = 'Total: $' + this.totalWithoutDiscount;
    curRow = worksheet.addRow(rowVals);

    curCell = worksheet.getCell(`A${rowNo}`);
    curCell.font = {
      size: 10,
      bold: true
    };
    curCell.alignment = { horizontal: 'right' };
    mergeCellsRange = `A${rowNo}:D${rowNo}`;
    worksheet.mergeCells(mergeCellsRange);

    rowVals = [];
    rowVals[1] = 'Discount: $' + this.discount;
    curRow = worksheet.addRow(rowVals);
    rowNo++;

    curCell = worksheet.getCell(`A${rowNo}`);
    curCell.font = {
      size: 12,
      bold: true
    };
    curCell.alignment = { horizontal: 'right' };
    curCell.border = { bottom: { style: 'thick' } };
    mergeCellsRange = `A${rowNo}:D${rowNo}`;
    worksheet.mergeCells(mergeCellsRange);


    rowVals = [];
    rowVals[1] = 'Grand Total: $' + this.total;
    curRow = worksheet.addRow(rowVals);
    rowNo++;

    curCell = worksheet.getCell(`A${rowNo}`);
    curCell.font = {
      size: 14,
      bold: true
    };
    curCell.alignment = { horizontal: 'right' };
    curCell.border = { bottom: { style: 'thick' } };
    mergeCellsRange = `A${rowNo}:D${rowNo}`;
    worksheet.mergeCells(mergeCellsRange);


    rowVals = [];
    rowVals[1] = '';
    curRow = worksheet.addRow(rowVals);
    rowNo++;

    curRow.height = 25;

    rowVals = [];
    rowVals[1] = 'powered by: ';
    rowVals[3] = ' I N V I';
    curRow = worksheet.addRow(rowVals);
    rowNo++;

    curRow.height = 25;

    curCell = worksheet.getCell(`A${rowNo}`);
    curCell.font = {
      size: 10,
      italic: true
    };
    curCell.alignment = {
      vertical: 'middle',
      horizontal: 'right'
    };
    mergeCellsRange = `A${rowNo}:B${rowNo}`;
    worksheet.mergeCells(mergeCellsRange);

    curCell = worksheet.getCell(`C${rowNo}`);
    curCell.font = {
      size: 12,
      bold: true
    };
    curCell.alignment = {
      vertical: 'middle',
      horizontal: 'left'
    };
    mergeCellsRange = `C${rowNo}:D${rowNo}`;
    worksheet.mergeCells(mergeCellsRange);


    // Add a couple of Rows by key-value, after the last current row, using the column keys
    // worksheet.addRow({ id: 1, name: 'John Doe', dob: new Date(1970, 1, 1) });
    // worksheet.addRow({ id: 2, name: 'Jane Doe', dob: new Date(1965, 1, 7) });

    // // Add a row by contiguous Array (assign to columns A, B & C)
    // worksheet.addRow([3, 'Sam', new Date()]);

    // // Add a row by Array (assign to columns A, B & C)
    // const rowValues = [];
    // rowValues[1] = 4;
    // rowValues[2] = 'Kyle';
    // rowValues[3] = new Date();
    // worksheet.addRow(rowValues);

    // // Add an array of rows
    // const rows = [
    //   [5, 'Bob', new Date()], // row by array
    //   { id: 6, name: 'Barbara', dob: new Date() }
    // ];
    // worksheet.addRows(rows);

    // // Apply styles to worksheet columns
    // worksheet.columns = [
    //   { header: 'Id', key: 'id', width: 10 },
    //   { header: 'Name', key: 'name', width: 32, style: { font: { name: 'Arial Black' } } },
    //   { header: 'D.O.B.', key: 'DOB', width: 10, style: { numFmt: 'dd/mm/yyyy' } }
    // ];

    workbook.xlsx.writeBuffer().then(res => {
      const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'Invoice.xlsx');
    });
  }

  private updateValues() {
    console.log('Updating printable-invoice values...');

    this.items = this.dataSvc.getAllItems();

    // TODO: Replace the following with direct updates to the native-elements' values.
    this.totalWithoutDiscount = this.dataSvc.ItemsTotal;
    this.discount = this.dataSvc.Discount;
    this.total = this.dataSvc.TotalWithDiscount;
  }

}
