import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { faChevronUp, faChevronDown, faFileExcel, faImage, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { InviMath } from 'src/app/utils/invi-math';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { Item } from 'src/app/models/item';
import { AppStateService } from 'src/app/services/app-state.service';
import { AppEventsService } from 'src/app/services/app-events.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  hidden = true;

  faChevronUp = faChevronUp;
  faChevronDown = faChevronDown;
  faFileExcel = faFileExcel;
  faImage = faImage;
  faFilePdf = faFilePdf;

  @ViewChild('footer', { static: true }) footer: ElementRef;
  @ViewChild('footerBody', { static: true }) footerBody: ElementRef;
  @ViewChild('row2Cntnr', { static: true }) divRow2Cntnr: ElementRef;
  @ViewChild('row3Cntnr', { static: true }) divRow3Cntnr: ElementRef;
  @ViewChild('row4Cntnr', { static: true }) divRow4Cntnr: ElementRef;
  @ViewChild('row5Cntnr', { static: true }) divRow5Cntnr: ElementRef;
  @ViewChild('lblDiscount', { static: true }) lblDiscount: ElementRef;

  blankSpaceHeight = 0;

  itemCount = 0;
  total = 0;
  discount = 0;
  totalWithDiscount = 0;
  removeMode = false;

  constructor(
    private dataSvc: DataStorageService,
    private appStateSvc: AppStateService,
    private appEventsSvc: AppEventsService,
  ) {
    this.updateAllValues();
  }

  ngOnInit(): void {
    this.updateFooterRowContainersDisplay();
    this.blankSpaceHeight = this.footerBody.nativeElement.offsetHeight;

    this.hidden = this.appStateSvc.FooterHidden;
    this.updateFooterRowContainersDisplay();

    this.removeMode = this.appStateSvc.RemoveMode;

    this.discount = this.dataSvc.Discount;
    this.recalc_totalWithDiscount();

    // Listen to changes in the item-list.
    this.subscribeToItemsChangeEvent();
    this.subscribeFooterHiddenChangeEvent();
    this.subscribeRemoveModeChangeEvent();
  }

  subscribeToItemsChangeEvent() {
    this.dataSvc.itemsChange$.subscribe(
      res => this.updateAllValues(res),
      err => console.error('Error receiving itemsChange notif.: ', err)
    );
  }

  subscribeFooterHiddenChangeEvent() {
    this.appEventsSvc.footerHiddenChange$.subscribe(
      res => {
        this.hidden = res;
        this.updateFooterRowContainersDisplay();
      },
      err => console.error('Error receiving footerHiddenChange notif.: ', err)
    );
  }

  subscribeRemoveModeChangeEvent() {
    this.appEventsSvc.removeModeChange$.subscribe(
      res => {
        this.removeMode = res;
        if (this.removeMode && !this.hidden) {
          this.appStateSvc.FooterHidden = true;
        }
      },
      err => console.error('Error receiving removeModeChange notif.: ', err)
    );
  }

  updateAllValues(items?: Item[]) {
    if (!items) {
      items = this.dataSvc.getAllItems();
    }

    this.itemCount = items.length;

    this.total = 0;
    items.forEach(i => this.total += i.Total());

    this.recalc_totalWithDiscount();
  }

  recalc_totalWithDiscount() {
    this.totalWithDiscount = InviMath.round(this.total - this.discount, 2);
  }

  discount_change() {
    this.dataSvc.Discount = this.discount;

    this.recalc_totalWithDiscount();
  }

  showHideBtn_click() {
    if (this.removeMode) {
      return;
    }

    this.hidden = !this.hidden;
    this.updateFooterRowContainersDisplay();

    this.appStateSvc.FooterHidden = this.hidden;
  }

  updateFooterRowContainersDisplay() {
    const displayVal = (this.hidden) ? 'none' : '';
    this.divRow2Cntnr.nativeElement.style.display = displayVal;
    this.divRow3Cntnr.nativeElement.style.display = displayVal;
    this.divRow4Cntnr.nativeElement.style.display = displayVal;
    this.divRow5Cntnr.nativeElement.style.display = displayVal;
  }

  genExcel() {
    console.log('Requesting invoice Excel workbook generation...');
  }

  genPDF() {
    console.log('Requesting invoice PDF generation...');
  }

  genImage() {
    console.log('Requesting invoice export image generation...');
  }

}
