import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { faChevronUp, faChevronDown, faPrint, faDownload, faShare } from '@fortawesome/free-solid-svg-icons';
import { InviMath } from 'src/app/utils/invi-math';
import { DataStorageService } from 'src/app/services/data-storage.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  hidden = false;

  faChevronUp = faChevronUp;
  faChevronDown = faChevronDown;
  faPrint = faPrint;
  faDownload = faDownload;
  faShare = faShare;

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

  constructor(
    private dataSvc: DataStorageService
  ) {
    this.updateAllValues();
  }

  ngOnInit(): void {
    this.updateFooterRowContainersDisplay();
    this.blankSpaceHeight = this.footerBody.nativeElement.offsetHeight;
  }

  updateAllValues() {
    const items = this.dataSvc.getAllItems();

    this.itemCount = items.length;
    items.forEach(i => this.total += i.Total());

    this.recalc_totalWithDiscount();
  }

  recalc_totalWithDiscount() {
    this.totalWithDiscount = InviMath.round(this.total - this.discount, 2);
  }

  discount_change() {
    this.recalc_totalWithDiscount();
  }

  showHideBtn_click(event: any) {
    console.log(event);
    this.hidden = !this.hidden;

    this.updateFooterRowContainersDisplay();
  }

  updateFooterRowContainersDisplay() {
    const displayVal = (this.hidden) ? 'none' : '';
    this.divRow2Cntnr.nativeElement.style.display = displayVal;
    this.divRow3Cntnr.nativeElement.style.display = displayVal;
    this.divRow4Cntnr.nativeElement.style.display = displayVal;
    this.divRow5Cntnr.nativeElement.style.display = displayVal;
  }

  print() {
    console.log('Printing the invoice...');
  }

  download() {
    console.log('Downloading the invoice...');
  }

  share() {
    console.log('Sharing the invoice...');
  }

}
