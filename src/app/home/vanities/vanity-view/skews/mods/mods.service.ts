import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import * as _ from 'lodash';

import { Sku } from '../../../../../state/config/sku.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../state/state';
import { User } from '../../../../../state/user/user.model';
import { Sum } from '../../../../../state/sum/sum.model';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable()
export class ModsService {
  url: string;
  price: number;

  private page = new BehaviorSubject<string>('');
  currentPage = this.page.asObservable();
  private counter = new BehaviorSubject<string>('');
  currentCounter = this.counter.asObservable();

  news: FirebaseObjectObservable<any>;
  values: any;
  sum$: Observable<Sum>;
  sum: Sum;
  user$: Observable<User>;
  user: User;

  constructor(private db: AngularFireDatabase, private store: Store<AppState>) {
    this.sum$ = this.store.select(state => state.sum);
    this.user$ = this.store.select(state => state.user);
  }

  changePage(page: string) {
    this.page.next(page);
  }

  changeCounter(counter: string) {
    this.counter.next(counter);
    console.log('Counter:' + counter);
  }

  updateCurrency(value) {
    this.user$.pipe(
      take(1),
      map(user => (this.user = user))
    );
    this.sum$.pipe(
      take(1),
      map(sum => (this.sum = sum))
    );
    this.db.object(`users/${this.user.uid}`).update({ currency: value });
    this.db.object(`orders/orderItems/${this.user.orderId}/info`).update({ currency: this.sum[value], type: value });
  }

  saveOrder(user: User, totals, sku: Sku) {
    this.sum$.pipe(
      take(1),
      map(sum => (this.sum = sum))
    );
    let ref = `orders/items/`;
    let refOptions = `orders/itemsSub/`;
    let ref2 = `orders/orderItems/${user.orderId}`;
    let pan = 0;
    let top = 0;
    if (sku.counter !== null) {
      top = _.toNumber(sku.counter.cost);
    }
    if (sku.pantry !== null) {
      pan = _.toNumber(sku.pantry.total);
    }

    let vanity = {
      line: sku.cabinet.line,
      sku: sku.cabinet.sku,
      sketch: sku.cabinet.urlSketch,
      price: _.toNumber(sku.cabinet.cost),
      material: sku.material.cat,
      matImage: sku.material.materialImage,
      color: sku.material.color,
      materialPrice: sku.material.cost,
      uid: user.uid,
      totalPantry: pan,
      totalCounter: top
    };
    let vanityOrder = this.db.list(ref).push(vanity);
    let items = {
      id: vanityOrder.key,
      type: 'skew'
    };

    let itemId = this.db.list(ref2 + '/items').push(items);
    let refItemId = `${ref2}/items/${itemId.key}/itemsSub`;
    let refVanId = `${ref}/${vanityOrder.key}/itemsSub`;
    let c: number;
    if (user.currency) {
      c = this.sum[user.currency];
    } else {
      c = 1;
    }
    let saveToOrder = {
      type: user.currency,
      currency: c
    };
    this.db.object(ref2 + '/info').update(saveToOrder);

    let total = {
      sku: sku.cabinet.sku,
      price: _.toNumber(sku.cabinet.cost),
      materialPrice: sku.material.cost,
      totalPantry: pan,
      totalCounter: top
    };

    let totals1 = this.db.list(ref2 + '/info/totals').push(total);
    let totals2 = { totals: totals1.key };
    this.db.object(`${ref2}/items/${itemId.key}`).update(totals2);

    if (sku.pantry) {
      let pantry = {
        sku: sku.pantry.sku,
        price: sku.pantry.cost,
        quantity: sku.pantry.quantity,
        uid: user.uid,
        sketch: sku.pantry.urlSketch,
        subItemOf: vanityOrder.key,
        hinged: sku.pantry.hinged
      };
      let pantryOrder = this.db.list(refOptions).push(pantry);
      let item = {
        id: pantryOrder.key,
        type: 'pantry'
      };
      let oikey = this.db.list(refItemId).push(item);
      let iikey = this.db.list(refVanId).push(item);
      let keys = {
        oikey: oikey.key,
        iikey: iikey.key,
        totalcat: 'totalPantry'
      };
      this.db.object(`${refItemId}/${oikey.key}`).update(keys);
    }

    if (sku.counter) {
      let counter = {
        sku: sku.counter.sku,
        topSketch: sku.counter.urlSketch,
        price: sku.counter.cost,
        sink: sku.counter.sink,
        sinkImage: sku.counter.imageSink,
        color: sku.counterColor.color,
        matImage: sku.counterColor.materialImage,
        uid: user.uid,
        subItemOf: vanityOrder.key,
        spread: sku.counter.spread,
        size: sku.counter.size,
        drilling: sku.counter.drilling
      };
      let counterOrder = this.db.list(refOptions).push(counter);
      items = {
        id: counterOrder.key,
        type: 'counter'
      };
      let oikey = this.db.list(refItemId).push(items);
      let iikey = this.db.list(refVanId).push(items);
      let keys = {
        oikey: oikey.key,
        iikey: iikey.key,
        totalcat: 'totalCounter'
      };
      this.db.object(`${refItemId}/${oikey.key}`).update(keys);
    }

    if (sku.accessories !== null) {
      sku.accessories.forEach(data => {
        let accessery: Object;
        if (data.sku !== 'Medicine Cabinet') {
          accessery = {
            sku: data.sku,
            option: data.option,
            total: data.total,
            price: data.cost,
            quantity: data.quantity,
            location: data.location,
            uid: user.uid,
            subItemOf: vanityOrder.key,
            image: data.url
          };
        } else {
          accessery = {
            sku: data.sku,
            option: data.option,
            total: data.total,
            price: data.cost,
            quantity: data.quantity,
            location: data.location,
            uid: user.uid,
            subItemOf: vanityOrder.key,
            image: data.url,
            color: data.color,
            matImage: data.colorImage
          };
        }
        let accesseryOrder = this.db.list(refOptions).push(accessery);
        items = {
          id: accesseryOrder.key,
          type: 'accessory'
        };
        let total3 = {
          sku: data.sku,
          price: data.cost,
          quantity: data.quantity
        };

        let oikey = this.db.list(refItemId).push(items);
        let iikey = this.db.list(refVanId).push(items);
        let oitkey = this.db.list(`${ref2}/info/totals/${totals1.key}/accessories`).push(total3);
        let iatkey = this.db.list(`${ref}/${vanityOrder.key}/accessories`).push(total3);
        let keys = {
          oikey: oikey.key,
          iikey: iikey.key,
          oitkey: oitkey.key,
          iatkey: iatkey.key
        };
        this.db.object(`${refItemId}/${oikey.key}`).update(keys);
      });
    }
  }

  get CurrentPage() {
    return this.currentPage;
  }
}
