import { Router } from '@angular/router';
import { OrderItem, OrderInfo, ItemSku, ItemsSub } from './orderItem';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';
import * as _ from 'lodash';
import 'rxjs/add/operator/first';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../../../../../state/state';
import { Store } from '@ngrx/store';
import { Sum } from '../../../../../state/sum/sum.model';
import { User } from '../../../../../state/user/user.model';

@Injectable()
export class OrderService {
    orderItems: FirebaseListObservable<OrderItem[]>;
    orderInfo: FirebaseObjectObservable<OrderInfo>;
    itemSku: FirebaseObjectObservable<ItemSku>;
    itemSub: FirebaseObjectObservable<ItemsSub>;
    items: FirebaseListObservable<any[]>;
    user$: Observable<User>;
    user: User;
    sum$: Observable<Sum>;
    sum: Sum;

    constructor(
        private db: AngularFireDatabase,
        private router: Router,
        private store:  Store<AppState>,
    ) {
        this.user$ = this.store.select(state => state.user);
        this.user$.subscribe(user => this.user = user);
        this.sum$ = this.store.select(state => state.sum);
        this.sum$.subscribe(sum => this.sum = sum);
     }

    getCurrentOrderItems(orderId): FirebaseListObservable<OrderItem[]> {
        let ref = `orders/orderItems/${orderId}/items`;
        this.orderItems = this.db.list(ref);
        return this.orderItems;
    }

    getCurrentOrderInfo(orderId): FirebaseObjectObservable<OrderInfo> {
        let ref = `orders/orderItems/${orderId}/info`;
        this.orderInfo = this.db.object(ref);
        return this.orderInfo;
    }

    getCurrentOrderItem(itemId): FirebaseObjectObservable<ItemSku> {
        let ref = `orders/items/${itemId}`;
        this.itemSku = this.db.object(ref);
        return this.itemSku;
    }

    getCurrentOrderItemSub(itemId): FirebaseObjectObservable<ItemsSub> {
        let ref = `orders/itemsSub/${itemId}`;
        this.itemSub = this.db.object(ref);
        return this.itemSub;
    }

    deleteCurrentItem(key) {
        let ref = `orders/items/${key}`;
        this.db.object(ref).remove();
    }

    deleteCurrentItemSub(key) {
        let ref = `orders/itemsSub/${key}`;
        this.db.object(ref).remove();
    }

    deleteCurrentTotal(key) {
        let ref = `orders/orderItems/${this.user.orderId}/info/totals/${key}`;
        this.db.object(ref).remove();
    }

    deleteCurrentOrderItem (key) {
        let ref = `orders/orderItems/${this.user.orderId}/items/${key}`;
        this.db.object(ref).remove();
    }
    subItemDelete(arr) {
        let refOI = `orders/orderItems/${this.user.orderId}/items/${arr.item}/itemsSub/${arr.oikey}`;
        let refII = `orders/items/${arr.itemID}/itemsSub/${arr.iikey}`;
        let refSUB = `orders/itemsSub/${arr.id}`;
        let ref = `orders/items/`;
        let refTotal = `orders/orderItems/${this.user.orderId}/info/totals/`;
        let total = {
            [arr.totalcat]: 0
        };
        this.db.object(refSUB).remove();
        // console.log(refSUB);
        this.db.object(refII).remove();
        // console.log(refII);
        this.db.object(refOI).remove();
        // console.log(refOI);
        if (arr.type === 'pantry' || arr.type === 'counter') {
            this.db.list(refTotal).update(arr.totals, total);
            this.db.list(ref).update(arr.itemID, total);
        }
        if (arr.type === 'accessory') {
            let refOIT = `orders/orderItems/${this.user.orderId}/info/totals/${arr.totals}/accessories/${arr.oitkey}`;
            let refIAT = `orders/items/${arr.itemID}/accessories/${arr.iatkey}`;
            this.db.object(refOIT).remove();
            // console.log(refOIT);
            this.db.object(refIAT).remove();
            // console.log(refIAT);
        }
    }

    sentOrderDesk(byUser) {
        let order = this.user.orderId;
        let user = byUser;
        let refBU = `orders/byUser/${this.user.uid}`;
        let refBO = `orders/orderItems/${order}`;
        let complete = {
            completed: true,
            orderDesk: true,
            timeStamp: firebase.database.ServerValue.TIMESTAMP,
        };
        this.db.list(refBU).update(user, complete);
        this.db.list(refBO).update('info', complete);
        this.db.list('orders/orderItems').update(order, {'orderDesk': true} );

        setTimeout( () => {
            this.router.navigate(['/dashboard/orders']);
        }, 5000);
    }
}
