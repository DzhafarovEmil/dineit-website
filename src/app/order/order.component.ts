import {Component, Host, Input, OnInit} from '@angular/core';
import {Order} from '../models/order';
import {OrdersComponent} from '../orders/orders.component';

declare let $: any;

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(@Host() parent: OrdersComponent) {
    this.parent = parent;
  }

  @Input() order: Order;
  private parent;

  ngOnInit() {
  }

  setOrderStatus(status: string): void {
    this.order.status = status;
    this.parent.editOrder(this.order);
  }
}
