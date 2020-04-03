import { Component, OnInit } from '@angular/core';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Item } from 'src/app/models/Item';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { AddEditItemComponent } from '../../shared/add-edit-item/add-edit-item.component';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  faPlus = faPlus;

  items: Item[] = [];
  addEditModalRef: BsModalRef;

  constructor(
    private modalSvc: BsModalService
  ) {
    // Start: Testing code
    for (let i = 0; i < 5; i++) {
      this.items[i] = new Item({
        name: 'This item name is intentionally too long to test the multi-row item name that could extend around three lines of text',
        quantity: i + 1,
        unit: '',
        price: 13.35 * (2 * i + 1)
      });
    }
    // End: Testing code
  }

  ngOnInit(): void {
  }

  addItem() {
    console.log('Adding new item...');
    this.openAddEditItemModal();
  }

  editItem(id: number) {
    console.log(`Editing item (id: ${id})...`);
    this.openAddEditItemModal(id);
  }

  openAddEditItemModal(id?: number) {
    const modalOpts = new ModalOptions();
    modalOpts.initialState = { id };
    modalOpts.ignoreBackdropClick = true;
    // modalOpts.focus = true;

    this.addEditModalRef = this.modalSvc.show(
      AddEditItemComponent,
      modalOpts
    );
  }

}
