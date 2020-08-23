import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-menu-modal',
  templateUrl: './menu-modal.component.html',
  styleUrls: ['./menu-modal.component.scss']
})
export class MenuModalComponent implements OnInit {

  title: string;
  closeBtnName: string;

  currencySymbol: string;
  printTitle: string;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
    // TODO: Replace the following sample code with the real code.
    this.currencySymbol = '$';
    this.printTitle = 'Invoice';
  }

  openAboutDeveloper() {
    console.log(`Opening 'About Developer' link...`);

    // TODO: Implement!
  }

}
