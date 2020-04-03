import { Injectable } from '@angular/core';
import { Item } from '../models/Item';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  private itemsKey = 'items';
  private itemsLastId = 0;

  private discountKey: 'discount';

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

  public getItem(id: number) {
    return this.Items.find(item => item.id === id);
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
