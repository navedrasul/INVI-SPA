import { Component, OnInit } from '@angular/core';
// import { DataStorageService } from './services/data-storage.service';
// import { Item } from './models/item';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // constructor(private dataSvc: DataStorageService) {
  //   Start: Testing code
  //   const items = [];

  //   for (let i = 0; i < 5; i++) {
  //     items[i] = new Item({
  //       name: 'This item name is intentionally too long to test the multi-row item name that could extend around three lines of text',
  //       quantity: i + 1,
  //       unit: '',
  //       price: 13.35 * (2 * i + 1)
  //     });
  //   }

  //   dataSvc.replaceAllItems(items);
  //   End: Testing code
  // }

  ngOnInit(): void {
  }

}
