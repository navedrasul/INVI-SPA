import { Component, OnInit } from '@angular/core';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Item } from 'src/app/models/Item';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  faPlus = faPlus;

  items: Item[] = [];

  constructor() {
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

}
