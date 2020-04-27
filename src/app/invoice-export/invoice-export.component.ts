import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { DatePipe } from '@angular/common';
import { DataStorageService } from '../services/data-storage.service';
import { Item } from '../models/item';
import { AppEventsService } from '../services/app-events.service';

@Component({
  selector: 'app-invoice-export',
  templateUrl: './invoice-export.component.html',
  styleUrls: ['./invoice-export.component.scss']
})
export class InvoiceExportComponent implements OnInit {

  @ViewChild('divExport', { static: true }) divExport: ElementRef;
  @ViewChild('dateText', { static: true }) dateText: ElementRef;

  invoiceDesc = '';

  items: Item[];

  // TODO: Replace the following with ViewChilds.
  totalWithoutDiscount = 0;
  discount = 0;
  total = 0;

  currDateTime: Date;

  eaCfg: ExportAsConfig = {
    type: 'png',
    elementIdOrContent: 'divExport'
  };

  constructor(
    private dataSvc: DataStorageService,
    private eaSvc: ExportAsService,
    private appEventsSvc: AppEventsService
  ) { }

  ngOnInit(): void {
    // Listen to app-events.
    this.subscribeExportImageChangeEvent();
    this.subscribeExportPdfChangeEvent();
    this.subscribeExportExcelChangeEvent();
  }

  subscribeExportImageChangeEvent() {
    this.appEventsSvc.exportImageChange$.subscribe(
      res => {
        this.generateImage();
      },
      err => console.error('Error receiving exportImageChange notif.: ', err)
    );
  }

  subscribeExportPdfChangeEvent() {
    this.appEventsSvc.exportPdfChange$.subscribe(
      res => {
        this.generatePdf();
      },
      err => console.error('Error receiving exportPdfChange notif.: ', err)
    );
  }

  subscribeExportExcelChangeEvent() {
    this.appEventsSvc.exportExcelChange$.subscribe(
      res => {
        this.generateExcel();
      },
      err => console.error('Error receiving exportExcelChange notif.: ', err)
    );
  }


  public generateImage() {
    console.log('Generating the image...');

    // Get the latest items.
    this.items = this.dataSvc.getAllItems();
    // TODO: Add some delay for the interface to update accroding to the updated items-array...
    // ... Alternatively, explicitly / force update the items-list interface.

    // Update the aggregate values.
    this.updateValues();

    // Update the timestamp.
    this.updateTimeStamp();

    // download the file using old school javascript method
    this.eaSvc.save(this.eaCfg, 'Invoice').subscribe(() => {
      // save started
    });
  }

  generatePdf() {
    console.log('Generating the PDF...');

    // TODO: Implement!
  }

  generateExcel() {
    console.log('Generating the Excel Workbook...');

    // TODO: Implement!
  }


  private updateValues() {
    console.log('Updating printable-invoice values...');

    this.items = this.dataSvc.getAllItems();

    // TODO: Replace the following with direct updates to the native-elements' values.
    this.totalWithoutDiscount = this.dataSvc.TotalWithDiscount;
    this.discount = this.dataSvc.Discount;
    this.total = this.dataSvc.Total;
  }

  private updateTimeStamp() {
    console.log('Updating printable-invoice time-stamp...');

    this.currDateTime = new Date();
    const dPipe = new DatePipe('en-PK');
    const now = dPipe.transform(this.currDateTime, 'medium');
    console.log('Invoice time-stamp updated: ', now);
    this.dateText.nativeElement.value = now;
  }

}
