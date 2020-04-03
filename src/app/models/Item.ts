import { InviMath } from '../utils/invi-math';

export class Item {

  id = 0;
  name = '';
  quantity = 0;
  unit = '';
  price = 0;
  discount = 0;

  constructor(init?: Partial<Item>) {
    Object.assign(this, init);

    // Round the price and discount to two decimal places.
    this.price = InviMath.round(this.price, 2);
    this.discount = InviMath.round(this.discount, 2);
  }

}
