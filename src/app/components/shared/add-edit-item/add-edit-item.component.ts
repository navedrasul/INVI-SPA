import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Item } from 'src/app/models/Item';
import { DataStorageService } from 'src/app/services/data-storage.service';

@Component({
  selector: 'app-add-edit-item',
  templateUrl: './add-edit-item.component.html',
  styleUrls: ['./add-edit-item.component.scss']
})
export class AddEditItemComponent implements OnInit {

  id: number;
  item: Item;

  constructor(
    public bsModalRef: BsModalRef,
    private dataSvc: DataStorageService
  ) { }

  ngOnInit(): void {
    this.item = this.dataSvc.getItem(this.id) || new Item();
  }

  saveAndClose() {
    console.log('Saving changes...');
  }

}
