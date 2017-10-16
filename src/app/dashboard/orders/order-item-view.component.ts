import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { SpinnerService } from '../../ui/loading-spinner/spinner.service';
import { SharedService } from '../../home/shared/shared.service';
import { OrderService } from '../../home/vanities/vanity-view/skews/order/order.service';
import { SubItems, OrderItem, ItemSku } from '../../home/vanities/vanity-view/skews/order/orderItem';
import { FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'order-item-view',
  templateUrl: './order-item-view.component.html',
  styleUrls: ['../../home/vanities/vanity-view/skews/order/order.component.css']
})

export class OrderItemViewComponent implements OnInit {
  @Input() orderItem: OrderItem;
  @Input() cur: number;
  itemSku: FirebaseObjectObservable<ItemSku>;
  array: SubItems[];
  counter: boolean;
  pantry: boolean;
  access: boolean;
  sku: string;
  line: string;

  constructor(
      private spinner: SpinnerService,
      private shared: SharedService,
      private order: OrderService,
      private router: Router
      ) {
      this.spinner.changeSpinner('false');
    }

  ngOnInit() {
    this.itemSku = this.order.getCurrentOrderItem(this.orderItem.id);
    this.array = _.toArray(this.orderItem.itemsSub);
    // console.log(this.array);
    this.array.forEach(data => {
      if (data.type === 'counter') { this.counter = true; }
      if (data.type === 'pantry') { this.pantry = true; }
      if (data.type === 'accessory') { this.access = true; }
    });
  }

  delete () {
    this.order.deleteCurrentItem(this.orderItem.id);
    this.order.deleteCurrentTotal(this.orderItem.totals);
    this.order.deleteCurrentOrderItem(this.orderItem.$key);
    this.array.forEach((data) => {
      this.order.deleteCurrentItemSub(data.id);
    });
  }

  reconfig () {
    this.itemSku.subscribe( data => {
      this.sku = data.sku;
      this.line = data.line;
    });
    this.router.navigate(['/home/vanities/' + this.line + '/' + this.sku + '/options']);
    this.order.deleteCurrentItem(this.orderItem.id);
    this.order.deleteCurrentTotal(this.orderItem.totals);
    this.order.deleteCurrentOrderItem(this.orderItem.$key);
    this.array.forEach((data) => {
      this.order.deleteCurrentItemSub(data.id);
    });
  }
}
