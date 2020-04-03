import { Component, OnInit } from '@angular/core';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Item } from 'src/app/models/Item';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { AddEditItemComponent } from '../../shared/add-edit-item/add-edit-item.component';
import { DataStorageService } from 'src/app/services/data-storage.service';

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
    private dataSvc: DataStorageService,
    private modalSvc: BsModalService
  ) {
    this.items = dataSvc.getAllItems();
  }

  ngOnInit(): void {
    const dataSvcObserver = {
      next: res => {
        this.items = res;
      },
      error: err => {
        console.error('Error retrieving updated items: ', err);
       },
      finally: () => { }
    };

    this.dataSvc.itemsChange$.subscribe(dataSvcObserver);

    // Start: Debugging Test Code.
    this.openAddEditItemModal();
    // End: Debugging Test Code.
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
