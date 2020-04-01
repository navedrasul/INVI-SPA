import { Component, OnInit, Input } from '@angular/core';
import { faPen, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { Item } from 'src/app/models/Item';

@Component({
  selector: 'app-item-row',
  templateUrl: './item-row.component.html',
  styleUrls: ['./item-row.component.scss']
})
export class ItemRowComponent implements OnInit {

  faPen = faPen;
  faMinusCircle = faMinusCircle;

  @Input()
  item: Item = new Item();
  // item: Item;

  removeMode = false;

  constructor() {
  }

  ngOnInit(): void {
    // Start: Testing code
    // if (!this.item) {
    //   this.item = new Item();
    // }

    // this.item.name = 'This item name is intentionally too long to test the multi-row item name that could extend around three lines of text';
    // this.item.quantity = 3;
    // this.item.unit = '';
    // this.item.price = 123.45;
    // End: Testing code
  }

  editItem(event: any) {
    console.log(event);
  }

}
