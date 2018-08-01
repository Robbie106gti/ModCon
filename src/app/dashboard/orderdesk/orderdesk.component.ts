import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { HomeService } from '../shared/home.service';
import { OrderItems } from '../../home/vanities/vanity-view/skews/order/orderItem';

@Component({
  selector: 'order-desk',
  template: `
<div class="col-md-12">
  <hr>
  <h2>Orders scheduled for processing</h2>
  <div class="thumbnail" *ngFor="let order of orderItems | async | reverse2">
    <div class="caption">
      <h3>Order ID:
        <a routerLink="/home/order/{{order?.$key}}"> {{ order?.$key }} </a>
        <small> || {{ order?.info.timeStamp | date:"medium" }} -
          <i *ngIf="order?.info.completed === true" class="fa fa-check-square-o success" aria-hidden="true"></i>
        </small>
      </h3>
      <dl>
        <dt>Ordered by: {{ order?.info.name }}</dt>
        <dd>Email: {{ order?.info.email }}</dd>
      </dl>
    </div>
  </div>
  `,
  styleUrls: ['../../home/vanities/vanity-view/skews/order/order.component.css']
})
export class OrderDeskComponent implements OnInit {
  orderItems: FirebaseListObservable<OrderItems[]> = null;

  constructor(private shared: HomeService) {}

  ngOnInit() {
    this.orderItems = this.shared.getOrderDesk();
  }
}
