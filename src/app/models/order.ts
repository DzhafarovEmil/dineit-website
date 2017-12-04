import {Food} from './food';
import {Customer} from './customer';

export class Order {
  id: number;
  status: string;
  orderedTime: number;
  foods: Food[];
  customer: Customer;

  constructor() {
    this.id = 0;
    this.status = '';
    this.orderedTime = 0;
    this.foods = [];
    this.customer = null;
  }
}
