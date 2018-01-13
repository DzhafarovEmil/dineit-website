import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Order} from "../models/order";
import {OrderService} from "../services/order.service";

declare let $: any;

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersComponent implements OnInit {

  constructor(private orderService: OrderService,
              private ref: ChangeDetectorRef) {
  }

  orders: Order[] = [];

  ngOnInit() {
    $(function () {
      $('.tooltipped').tooltip({delay: 50});
    });
    this.fetchElements();
  }

  editOrder(order: Order) {
    this.orderService.editOrder(order, {
      success: (o: Order) => {
        for (let i = this.orders.length - 1; i >= 0; i--) {
          if (this.orders[i].id === o.id) {
            this.orders[i] = o;
            this.ref.markForCheck();
            break;
          }
        }
      }
    });
  }

  fetchElements() {
    this.orders.length = 0;
    this.orderService.getOrders().subscribe(orders => {
      this.orders = orders;
      this.ref.markForCheck();
    });
  }
}
