import { Injectable } from '@angular/core';
import { Item } from '../models/item';
import { Subject } from 'rxjs';
import { AppState } from '../models/AppState';
import { InviMath } from '../utils/invi-math';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  private itemsKey = 'items';
  private itemsLastId = 0;

  private discountKey = 'discount';

  private appStateKey = 'appState';

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

      // Convert from Object[] to Item[].
      items = items?.map(i => new Item(i));
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

  public removeAllItems() {
    this.itemsLastId = 0;
    this.Items = [];
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
    this.Items = this.Items.map(i => (i.id === item.id) ? item : i);
  }

  public removeItem(id: number) {
    this.Items = this.Items.filter(i => i.id !== id);
  }


  // Discount methods

  public get Discount(): number {
    let discount: number;
    try {
      // Convert the localStorage string value into a number.
      discount = +localStorage.getItem(this.discountKey);
    } catch (err) {
      console.error(`Error getting ${this.discountKey} from the localStorage: `, err);
    }

    // Replace falsey value (including NaN) to zero.
    return discount || 0;
  }

  public set Discount(v: number) {
    try {
      localStorage.setItem(this.discountKey, v.toString());
    } catch (err) {
      console.error(`Error saving '${this.discountKey}' to the localStorage: `, err);
    }
  }


  // App-State methods

  public get CurrAppState(): AppState {
    let appState: AppState;
    try {
      const appStateStr = localStorage.getItem(this.appStateKey);

      if (appStateStr) {
        // Convert the localStorage string value into AppState object.
        appState = new AppState(JSON.parse(appStateStr));
      }
    } catch (err) {
      console.error(`Error getting '${this.appStateKey}' from the localStorage: `, err);
    }

    // Replace falsey value with default AppState object.
    if (!appState) {
      appState = new AppState();
      this.CurrAppState = appState;
    }

    return appState;
  }

  public set CurrAppState(appState: AppState) {
    if (!appState) {
      // Set default AppState.
      appState = new AppState();
    }

    try {
      localStorage.setItem(this.appStateKey, JSON.stringify(appState));
    } catch (err) {
      console.error(`Error saving ${this.appStateKey} to the localStorage: `, err);
    }
  }

  public get ItemsTotal() {
    let total = 0;
    this.Items.forEach(i => total += i.Total());
    return total;
  }

  public get TotalWithDiscount() {
    return InviMath.round(this.ItemsTotal - this.Discount, 2);
  }

}
