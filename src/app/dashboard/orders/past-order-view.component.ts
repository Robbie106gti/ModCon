import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { HomeService } from '../shared/home.service';
import { Order, ItemOrder, OrderInfo } from '../../home/vanities/vanity-view/skews/order/orderItem';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import { User } from '../../state/user/user.model';
import { Sum } from '../../state/sum/sum.model';
import { AppState } from '../../state/state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'past-order-view',
  templateUrl: './past-order-view.component.html',
  styleUrls: ['../../home/vanities/vanity-view/skews/order/order.component.css']
})
export class PastOrderViewComponent implements OnInit {
    @Input() order: Order;
    items: FirebaseListObservable<ItemOrder[]>;
    orderitem: FirebaseObjectObservable<any>;
    info: FirebaseObjectObservable<OrderInfo>;
    arr: any[] = null;
    data: any;
    subitem: any;
    totalAccessories: number = 0;
    accArr: any;
    orderTotal: number = 0;
    user$: Observable<User>;
    user: User;
    sum$: Observable<Sum>;

  constructor(
    private store: Store<AppState>,
    private shared: HomeService
      ) {
        this.user$ = this.store.select(state => state.user);
        this.sum$ = this.store.select(state => state.sum);
        this.user$.subscribe( user => this.user = user);
      }

  ngOnInit() {
    this.items = this.shared.getOrderItems(this.order.orderId);
    this.info = this.shared.getOrderInfo(this.order.orderId);
    this.items.subscribe(
        data => {
          // console.log(data);
          if (data['0']) {
          this.arr = data;
          this.arr.forEach(element => {
              this.orderitem = this.shared.getOrderItem(element.id);
              this.orderitem.take(1).subscribe(
                item => {
                  // console.log(item);
                  let id = this.arr.findIndex(x => x.id === element.id);
                  this.accArr = _.toArray(item.accessories);
                  this.totalAccessories = 0;
                  this.accArr.forEach(a => {
                   this.totalAccessories += +(a.price * a.quantity);
                  });
                  this.arr[id] = item;
                  this.arr[id]['totalAccessories'] = this.totalAccessories;
                  let total = item.price + item.totalPantry;
                  total = total * item.materialPrice;
                  total = total + item.totalCounter + this.totalAccessories;
                  this.arr[id]['total'] = total;
                  this.orderTotal += total;
                  let itemsSub =  _.toArray(item.itemsSub);
                  itemsSub.forEach(sub => {
                    this.subitem = this.shared.getOrderItemSub(sub.id);
                    this.subitem.take(1).subscribe(
                      s => {
                        if (sub.type === 'counter') {
                          let counter = {
                            'sku': 	s.sku,
                            'sink': s.sink,
                            'color': s.color
                          };
                          this.arr[id]['counter'] = counter;
                        }
                        if (sub.type === 'pantry') {
                          let pantry = {
                            'sku': s.sku,
                            'quantity': '1',
                            'hinged': 'left'
                          };
                          this.arr[id]['pantry'] = pantry;
                        }
                        // console.log(s);
                      }
                    );
                  });
                }
              );
              // console.log(this.arr);
          });
        }
        }
    );
   // this.vanities.subscribe(() => this.showSpinner = false);
  }

  extractToPromise(item) {
    item.first().toPromise()
      .then (
        data => {
          console.log(data);
        }
      );
  }
}
