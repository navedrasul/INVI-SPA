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
  }

  editItem(event: any) {
    console.log(event);
  }

}
