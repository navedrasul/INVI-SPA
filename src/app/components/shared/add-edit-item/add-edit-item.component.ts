import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Item } from 'src/app/models/item';
import { DataStorageService } from 'src/app/services/data-storage.service';

@Component({
  selector: 'app-add-edit-item',
  templateUrl: './add-edit-item.component.html',
  styleUrls: ['./add-edit-item.component.scss']
})
export class AddEditItemComponent implements OnInit {

  id: number;
  item: Item;
  totalBeforeDiscount: number;
  total: number;

  constructor(
    public modalRef: BsModalRef,
    private dataSvc: DataStorageService
  ) { }

  ngOnInit(): void {
    this.item = this.dataSvc.getItem(this.id) || new Item();
    this.recalcTotals();
  }

  recalcTotals() {
    this.totalBeforeDiscount = this.item.price * this.item.quantity;
    this.total = this.totalBeforeDiscount - this.item.discount;
  }

  saveAndClose() {
    console.log('Saving changes...');

    if (this.item.id) {
      this.dataSvc.updateItem(this.item);
    } else {
      this.dataSvc.addItem(this.item);
    }

    this.modalRef.hide();
  }

}
