import { SpinnerService } from '../../../../../ui/loading-spinner/spinner.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { SharedService } from '../../../../shared/shared.service';
import { OrderItem, OrderInfo, Totals, Access } from './orderItem';
import { OrderService } from './order.service';
import { AuthService } from '../../../../../users/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import 'rxjs/add/operator/first';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../../../../../state/state';
import { Store } from '@ngrx/store';
import { Sum } from '../../../../../state/sum/sum.model';
import { User } from '../../../../../state/user/user.model';
import { OrderIdService } from '../../../../../users/shared/order-id.service';

@Component({
  selector: 'user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./order.component.css']
})
export class UserOrderComponent implements OnInit {
  title: any;
  orderInfo: FirebaseObjectObservable<OrderInfo>;
  orderItems: FirebaseListObservable<OrderItem[]>;
  array: Totals[];
  orderTotal: number;
  skuTotal: number;
  access: number;
  array2: Access[];
  alert: boolean;
  items: FirebaseListObservable<any[]> = null;
  completed: boolean;
  user$: Observable<User>;
  sum$: Observable<Sum>;
  user: User;
  cur: number = 1;

  constructor(
      private spinner: SpinnerService,
      private shared: SharedService,
      private order: OrderService,
      private auth: AuthService,
      private store: Store<AppState>,
      private route: ActivatedRoute,
      private orderId: OrderIdService
      ) {
      this.spinner.changeSpinner('true');
      this.user$ = this.store.select(state => state.user);
      this.sum$ = this.store.select(state => state.sum);
      this.user$.subscribe( user => {
        this.user = user;
        this.sum$.take(1).subscribe(
          sum => {
            if (user.currency === 'usd') {
              this.cur = sum.usd;
            } else {
              this.cur = sum.can;
            }
          }
        );
      });
    }

  ngOnInit() {
    this.title = this.route.snapshot.params.id;
    this.orderInfo = this.order.getCurrentOrderInfo(this.title);
    this.orderItems = this.order.getCurrentOrderItems(this.title);
    this.orderInfo.subscribe(data => {
      this.array = _.toArray(data.totals);
      // this.orderTotal = _.toNumber(_.sumBy(this.array, 'total'));
      // console.log(data);
      this.orderTotal = 0;
      this.array.forEach(arr => {
        this.array2 = _.toArray(arr.accessories);
        this.access = 0;
        this.skuTotal = 0;
        this.array2.forEach(ar => {
          this.access += + (ar.price * ar.quantity);
        });
        arr['totalAccessories'] = this.access;
        this.skuTotal += + (arr.materialPrice * (arr.price + arr.totalPantry)) + arr.totalAccessories + arr.totalCounter;
        // console.log(this.orderTotal);
        arr['total'] = this.skuTotal;
        this.orderTotal += this.skuTotal;
      });
      this.array['total'] = this.orderTotal;
      // console.log(this.array);
    });
    this.spinner.changeSpinner('false');
    this.completedOrder();
  }

  alertMe() {
    this.alert = true;
    setTimeout( () => {
      this.alert = false;
    }, 5000);
    let byUser: string;
    this.orderInfo.take(1).subscribe(info => {
      byUser = info.byUser;
      this.order.sentOrderDesk(byUser);
      this.orderId.createOrder();
    });
  }

  dismissed() {
    this.alert = false;
  }

  completedOrder() {
    if (this.title === this.user.orderId) {
      this.completed = true;
    } else {
      this.completed = false;
    }
    return this.completed;
  }

}
