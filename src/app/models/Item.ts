import { InviMath } from '../utils/Math';

export class Item {

  name = '';
  quantity = 0;
  unit = '';
  price = 0;

  constructor(init?: Partial<Item>) {
    Object.assign(this, init);

    // Round the price to two decimal places.
    this.price = InviMath.round(this.price, 2);
  }

}
