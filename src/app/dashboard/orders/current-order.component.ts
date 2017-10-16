import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AuthService } from '../../users/auth/auth.service';
import { OrderService } from '../../home/vanities/vanity-view/skews/order/order.service';
import * as _ from 'lodash';
import { Access, Totals, OrderItem, OrderInfo } from '../../home/vanities/vanity-view/skews/order/orderItem';
import { SpinnerService } from '../../ui/loading-spinner/spinner.service';
import { AppState } from '../../state/state';
import { Store } from '@ngrx/store';
import { Sum } from '../../state/sum/sum.model';
import { Observable } from 'rxjs/Observable';
import { User } from '../../state/user/user.model';

@Component({
  selector: 'current-order-view',
  template: `
    <div class="row">
        <div class="col-lg-2 col-lg-push-10 col-md-3 col-md-push-9 col-sm-6 col-xs-12" *ngIf="orderInfo">
            <div class="thumbnail">
                <div class="caption">
                    <h3>{{ (orderInfo | async)?.name }}</h3>
                    <dl>
                        <dt>Provider: </dt>
                        <dd> {{ user?.provider }}</dd>
                        <dt>Email: </dt>
                        <dd> {{ (orderInfo | async)?.email }}</dd>
                        <dt>UID: </dt>
                        <dd> <small>{{ (orderInfo | async)?.UID }}</small></dd>
                    </dl>
                </div>
            </div>
        </div>
        <div class="col-md-9 col-md-pull-3 col-lg-10 col-lg-pull-2 col-sm-6 col-xs-12" *ngIf="user$ | async as user">
        <h2>Your current open order.</h2>
            <div class="thumbnail">
            <order-item-view *ngFor="let orderItem of orderItems | async" [orderItem]="orderItem" [cur]="cur"></order-item-view>
                <div class="caption">
                    <h3>Order total: </h3>
                    <h4>{{ user.currency | uppercase }} $ {{ orderTotal * cur | number:'1.2-2' }}</h4>
                </div>
                <div *ngIf="ready" class="alert alert-success" role="alert" (click)="alertMe()">
                    <i class="fa fa-credit-card fa-3x" aria-hidden="true"></i>
                    Confirm order
                    <br><br>
                </div>
            </div>
        </div>
    </div>
  `
})
export class CurrentOrderComponent implements OnInit {
    orderInfo: FirebaseObjectObservable<OrderInfo>;
    orderItems: FirebaseListObservable<OrderItem[]>;
    array: Totals[];
    orderTotal: number;
    skuTotal: number;
    access: number;
    array2: Access[];
    alert: boolean;
    user$: Observable<User>;
    sum$: Observable<Sum>;
    user: User;
    cur: number = 1;

  constructor(
    private order: OrderService,
    private spinner: SpinnerService,
    private store: Store<AppState>,
    private auth: AuthService
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
        this.orderInfo = this.order.getCurrentOrderInfo(this.user.orderId);
        this.orderItems = this.order.getCurrentOrderItems(this.user.orderId);
    }

  ngOnInit() {
    this.orderInfo.subscribe(data => {
      this.array = _.toArray(data.totals);
      // this.orderTotal = _.toNumber(_.sumBy(this.array, 'total'));
      // console.log(this.array);
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
    });
    this.spinner.changeSpinner('false');
  }

  alertMe() {
      return;
  }
}
