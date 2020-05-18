// tslint:disable-next-line: max-line-length
import {
  Component, OnInit, ViewChild, ElementRef,
  AfterViewChecked
} from '@angular/core';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { DatePipe } from '@angular/common';
import { DataStorageService } from '../services/data-storage.service';
import { Item } from '../models/item';
import { AppEventsService } from '../services/app-events.service';
import * as ihPrint from '../../assets/js/ink-html/invi-ink-html.js';

@Component({
  selector: 'app-invoice-export',
  templateUrl: './invoice-export.component.html',
  styleUrls: ['./invoice-export.component.scss']
})
export class InvoiceExportComponent implements OnInit, AfterViewChecked {

  @ViewChild('divExport', { static: true }) divExport: ElementRef;
  @ViewChild('dateText', { static: true }) dateText: ElementRef;

  invoiceDesc = '';

  items: Item[];

  totalWithoutDiscount = 0;
  discount = 0;
  total = 0;

  currDateTime: Date;

  eaCfg: ExportAsConfig = {
    type: 'png',
    elementIdOrContent: 'divExport'
  };

  imgPrintflag = false;
  pdfPrintflag = false;

  constructor(
    private dataSvc: DataStorageService,
    private eaSvc: ExportAsService,
    private appEventsSvc: AppEventsService
  ) {
  }

  ngOnInit(): void {
    // Listen to app-events.
    this.subscribeExportImageChangeEvent();
    this.subscribeExportPdfChangeEvent();
    this.subscribeExportExcelChangeEvent();
  }

  ngAfterViewChecked(): void {
    if (this.imgPrintflag) {
      this.imgPrintflag = false;
      this.eaSvc.save(this.eaCfg, 'Invoice').subscribe(() => {
        // save started
      });
    } else if (this.pdfPrintflag) {
      this.pdfPrintflag = false;
      ihPrint(this.divExport.nativeElement);
    }
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

    // Update the aggregate values.
    this.updateValues();

    // Update the timestamp.
    this.updateTimeStamp();

    // Set the flag to print the image when ngAfterViewChecked() will be called.
    this.imgPrintflag = true;
  }

  generatePdf() {
    console.log('Generating the PDF...');

    // Get the latest items.
    this.items = this.dataSvc.getAllItems();

    // Update the aggregate values.
    this.updateValues();

    // Update the timestamp.
    this.updateTimeStamp();

    // Set the flag to print the image when ngAfterViewChecked() will be called.
    this.pdfPrintflag = true;
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
