import { Component, OnInit } from '@angular/core';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Item } from 'src/app/models/item';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { AddEditItemComponent } from '../../shared/add-edit-item/add-edit-item.component';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { AppEventsService } from 'src/app/services/app-events.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  faPlus = faPlus;

  items: Item[] = [];
  addEditModalRef: BsModalRef;
  removeMode = false;

  constructor(
    private dataSvc: DataStorageService,
    private modalSvc: BsModalService,
    private appEventsSvc: AppEventsService
  ) {
    this.items = dataSvc.getAllItems();
  }

  ngOnInit(): void {
    this.subscribeToItemsChangeEvent();
    this.subscribeRemoveModeChangeEvent();
  }

  subscribeToItemsChangeEvent() {
    this.dataSvc.itemsChange$.subscribe(
      res => this.items = res,
      err => console.error('Error receiving itemsChange notif.: ', err)
    );
  }

  subscribeRemoveModeChangeEvent() {
    this.appEventsSvc.removeModeChange$.subscribe(
      res => this.removeMode = res,
      err => console.error('Error receiving removeModeChange notif.: ', err)
    );
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

  removeItem(id: number) {
    console.log(`Removing item (id: ${id})...`);
    this.dataSvc.removeItem(id);
  }

}
