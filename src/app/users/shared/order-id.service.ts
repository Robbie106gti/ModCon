import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase';
import { FlashMessagesService } from 'angular2-flash-messages/module';
import * as _ from 'lodash';

import { AppState } from '../../state/state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { User } from '../../state/user/user.model';

@Injectable()
export class OrderIdService {
  user$: Observable<User>;
  user: User;
  order: any;

  constructor(
      private db: AngularFireDatabase,
      public flashMessage: FlashMessagesService,
      private store: Store<AppState>
      ) {
        this.user$ = this.store.select(state => state.user);
        this.user$.subscribe(user => this.user = user);
    }

    createOrder() {
        // console.log(this.user);
        let ref = `orders/orderItems/`;
        let obj = {
            'UID': this.user.uid,
            'email': this.user.email,
            'name': this.user.displayName,
            'timeStamp': firebase.database.ServerValue.TIMESTAMP,
            'completed': false
        };

        let info = {
            'info' : obj
        };
        // console.log('hi');
        let newOrder = this.db.list(ref).push(info);
        let orderId = newOrder.key;
        this.db.object(`users/${this.user.uid}`).update({'orderId': orderId});
        ref = `orders/byUser/${this.user.uid}`;

        let obj2 = {
            'completed': false,
            'timeStamp': firebase.database.ServerValue.TIMESTAMP,
            'orderId': orderId
        };
        let byUser = this.db.list(ref).push(obj2);
        this.db.object(`orders/orderItems/${orderId}/info`).update({ 'byUser': byUser.key });
        ///// Also check in user.facade (state/user)
        }
}
