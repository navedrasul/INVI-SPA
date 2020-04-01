import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { faChevronUp, faChevronDown, faPrint, faDownload, faShare } from "@fortawesome/free-solid-svg-icons";

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

  @Input()
  itemCount = 5;

  @ViewChild('row2Cntnr', { static: true }) divRow2Cntnr: ElementRef;
  @ViewChild('row3Cntnr', { static: true }) divRow3Cntnr: ElementRef;
  @ViewChild('row4Cntnr', { static: true }) divRow4Cntnr: ElementRef;
  @ViewChild('row5Cntnr', { static: true }) divRow5Cntnr: ElementRef;
  @ViewChild('lblDiscount', { static: true }) lblDiscount: ElementRef;

  total = 234.56;
  discount = 12.3;
  totalWithDiscount: number;

  constructor() {
    this.recalc_totalWithDiscount();
  }

  ngOnInit(): void {
    this.updateFooterRowContainersDisplay();
  }

  recalc_totalWithDiscount() {
    this.totalWithDiscount = this.total - this.discount;
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
    console.log('Printing the invoice...')
  }

  download() {
    console.log('Downloading the invoice...')
  }

  share() {
    console.log('Sharing the invoice...')
  }

}
