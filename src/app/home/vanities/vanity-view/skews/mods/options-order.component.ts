import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { take, map } from 'rxjs/operators';

import { ModsService } from './mods.service';
import { ToastService } from '../../../../shared/toast.service';
import { Observable } from 'rxjs';
import { Sku, Accessory } from '../../../../../state/config/sku.model';
import { User } from '../../../../../state/user/user.model';
import { AppState } from '../../../../../state/state';
import { Store } from '@ngrx/store';
import { Sum } from '../../../../../state/sum/sum.model';
import * as SkuActions from '../../../../../state/config/sku.actions';

@Component({
  selector: 'options-order',
  templateUrl: './options-order.component.html',
  styles: [
    `
      .thumbnail {
        text-align: center;
      }

      .fa-trash {
        padding-top: 5px;
        padding-right: 8px;
        margin-left: -10px;
        color: red;
      }
      span > img {
        display: none;
        position: absolute;
        top: 50%;
        left: 100%;
        max-width: 50%;
        z-index: 999;
      }
      span:hover > img {
        display: block;
      }
    `
  ]
})
export class OptionsOrderComponent implements OnInit {
  id: any;
  title: string;
  titleSkew: string;
  page: string;
  sku$: Observable<Sku>;
  user$: Observable<User>;
  sum$: Observable<Sum>;
  access$: Accessory[];

  constructor(private mods: ModsService, private toast: ToastService, private store: Store<AppState>) {
    this.sku$ = this.store.select(state => state.sku);
    this.user$ = this.store.select(state => state.user);
    this.sum$ = this.store.select(state => state.sum);
  }

  ngOnInit() {
    this.mods.changePage('options');
    this.mods.currentPage.subscribe(page => (this.page = page));
  }

  remove(i) {
    this.sku$.pipe(
      take(1),
      map(sku => {
        this.access$ = sku.accessories;
      })
    );
    let array = this.access$;
    _.pullAt(array, i);
    this.store.dispatch(new SkuActions.RemoveAccessory(array));
  }

  removeItem(value) {
    if (value === 'pantry') {
      this.store.dispatch(new SkuActions.AddPantry(null));
      let content = 'Pantry has been removed from your order.';
      let style = 'danger';
      this.toast.sendMessage(content, style);
    }
    if (value === 'color') {
      this.store.dispatch(new SkuActions.AddMaterial(null));
      let content = 'Material/Color has been removed from your order.';
      let style = 'danger';
      this.toast.sendMessage(content, style);
    }
    if (value === 'counter') {
      this.store.dispatch(new SkuActions.AddCounter(null));
      this.store.dispatch(new SkuActions.AddCounterColor(null));
      let content = 'Counter has been removed from your order.';
      let style = 'danger';
      this.toast.sendMessage(content, style);
    }
  }
}
