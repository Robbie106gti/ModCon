import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { HomeService } from '../shared/home.service';
import { Order } from '../../home/vanities/vanity-view/skews/order/orderItem';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/state';
import { User } from '../../state/user/user.model';
import { Sum } from '../../state/sum/sum.model';

@Component({
  selector: 'past-orders',
  templateUrl: './past-orders.component.html',
  styleUrls: ['../../home/vanities/vanity-view/skews/order/order.component.css']
})
export class PastOrderComponent implements OnInit {
  user$: Observable<User>;
  user: User;
  orders: FirebaseListObservable<Order[]> = null;
  cur: number = 1;

  showSpinner: boolean = true;

  constructor(
    private store: Store<AppState>,
    private shared: HomeService
      ) {
        this.user$ = this.store.select(state => state.user);
        this.user$.subscribe( user => {
          this.user = user;
          if (user.loading === false) {
            this.orders = this.shared.getUsersOrders(this.user.uid);
          }
        } );
      }

  ngOnInit() {
  }
}
