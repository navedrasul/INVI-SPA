import { Injectable } from '@angular/core';
import { Item } from '../models/Item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  private itemsKey = 'items';
  private itemsLastId = 0;

  private discountKey: 'discount';

  private itemsChangeSource = new Subject<Item[]>();
  itemsChange$ = this.itemsChangeSource.asObservable();

  constructor() {
    this.updateItemsLastId();
  }


  // Items methods

  updateItemsLastId() {
    this.Items.forEach(i => {
      if (i.id > this.itemsLastId) {
        this.itemsLastId = i.id;
      }
    });
  }

  private get Items(): Item[] {
    let items: Item[];
    try {
      items = JSON.parse(localStorage.getItem(this.itemsKey));
    } catch (err) {
      console.error('Error getting items from the localStorage: ', err);
    }

    return items || [];
  }

  private set Items(items: Item[]) {
    let itemsStr: string;
    try {
      itemsStr = JSON.stringify(items);
      localStorage.setItem(this.itemsKey, itemsStr);

      // Notify the change.
      this.itemsChangeSource.next(items);
    } catch (err) {
      console.error('Error saving items to the localStorage: ', err);
    }
  }

  public replaceAllItems(items: Item[]) {
    // Set 'id' of each item.
    items.forEach((i, idx) => {
      i.id = idx + 1;
    });

    this.itemsLastId = items.length;

    this.Items = items;
  }

  public addItem(item: Item) {
    // Set the item-id
    this.itemsLastId++;
    item.id = this.itemsLastId;

    const items = this.Items;
    items.push(item);
    this.Items = items;
  }

  public getAllItems() {
    return this.Items;
  }

  public getItem(id: number) {
    return this.Items.find(item => item.id === id);
  }

  public updateItem(item: Item) {
    // Flag to avoid storing changes when item with the given id is not found.
    let itemUpdated = false;

    const updatedItems = this.Items.map(i => {
      if (i.id === item.id) {
        return item;
        itemUpdated = true;
      } else {
        return i;
      }
    });

    if (itemUpdated) {
      this.Items = updatedItems;
    }
  }


  // Discount methods

  public get Discount(): number {
    let Discount: number;
    try {
      // Convert the localStorage string value into a number.
      Discount = +localStorage.getItem(this.discountKey);
    } catch (err) {
      console.error('Error getting Discount from the localStorage: ', err);
    }

    // Replace falsey value (including NaN) to zero.
    return Discount || 0;
  }

  public set Discount(v: number) {
    try {
      localStorage.setItem(this.discountKey, v.toString());
    } catch (err) {
      console.error('Error saving Discount to the localStorage: ', err);
    }
  }

}
