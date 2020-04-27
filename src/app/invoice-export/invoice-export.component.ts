import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { DatePipe } from '@angular/common';
import { DataStorageService } from '../services/data-storage.service';
import { Item } from '../models/item';

@Component({
  selector: 'app-invoice-export',
  templateUrl: './invoice-export.component.html',
  styleUrls: ['./invoice-export.component.scss']
})
export class InvoiceExportComponent implements OnInit {

  @ViewChild('divExport', { static: true }) divExport: ElementRef;
  @ViewChild('dateText', { static: true }) dateText: ElementRef;

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
    private eaSvc: ExportAsService
  ) { }

  ngOnInit(): void {
  }

  public generateImage() {
    console.log('Generating the image...');

    this.updateValues();
    this.updateTimeStamp();

    // download the file using old school javascript method
    this.eaSvc.save(this.eaCfg, 'Invoice').subscribe(() => {
      // save started
    });
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
