import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';

import { ModsService } from './mods.service';
import { ToastService } from '../../../../shared/toast.service';
import { Observable } from 'rxjs/Observable';
import { Accessory, Sku} from '../../../../../state/config/sku.model';;
import { AppState } from '../../../../../state/state';
import { Store } from '@ngrx/store';
import * as SkuActions from '../../../../../state/config/sku.actions';


@Component({
  selector: 'mods-order',
  template: `
  <div *ngIf="sku$ | async as sku">
  <div *ngIf="page !== 'options'">
    <div *ngIf="!sku.material; else tmColor" class="btn-group">
        <a [routerLink]="['options/colors']" routerLinkActive="active" class="thumbnail">
            <i class="fa fa-plus-square fa-2x" aria-hidden="true"></i>
            <h6>Colors</h6>
        </a>
    </div>
    <div *ngIf="!sku.counterColor; else tmCounter" class="btn-group">
        <a [routerLink]="['options/counters']" routerLinkActive="active" class="thumbnail">
            <i class="fa fa-plus-square fa-2x" aria-hidden="true"></i>
            <h6>Counters</h6>
        </a>
    </div>
    <div *ngIf="sku.accessories == 0; else tmAccessory" class="btn-group">
        <a [routerLink]="['options/accessories']" routerLinkActive="active" class="thumbnail">
            <i class="fa fa-plus-square fa-2x" aria-hidden="true"></i>
            <h6>Accessories</h6>
        </a>
    </div>
    <div *ngIf="!sku.pantry; else tmPantry" class="btn-group">
        <a [routerLink]="['options/pantries']" routerLinkActive="active" class="thumbnail">
            <i class="fa fa-plus-square fa-2x" aria-hidden="true"></i>
            <h6>Pantries</h6>
        </a>
    </div>

<ng-template #tmColor>
    <div class="btn-group">
    <span (click)="removeItem('color')"><i class="fa fa-trash pull-right" aria-hidden="true"></i></span>
        <a [routerLink]="['options/colors']" routerLinkActive="active" class="thumbnail">
        <img *ngIf='sku.material.materialImage'  class="color" src="{{ sku.material.materialImage }}" >
        <h6>{{ sku.material.color }}</h6>
        </a>
    </div>
</ng-template>

<ng-template #tmCounter>
    <div class="btn-group">
    <span (click)="removeItem('counter')"><i class="fa fa-trash pull-right" aria-hidden="true"></i></span>
        <a [routerLink]="['options/counters']" routerLinkActive="active" class="thumbnail">
        <img *ngIf=' sku.counterColor.materialImage '  class="color" src="{{ sku.counterColor?.materialImage }}" >
        <h6>{{ sku.counterColor.color }}</h6>
        </a>
    </div>
    <div *ngIf='!sku.counter.sku; else tmCSpec' class="btn-group">
        <a [routerLink]="['options/counters']" routerLinkActive="active" class="thumbnail">
            <i class="fa fa-plus-square fa-2x" aria-hidden="true"></i>
            <h6>Counter-Top</h6>
        </a>
    </div>
    <div *ngIf='!sku.counter.sink; else tmSink' class="btn-group">
        <a [routerLink]="['options/counters']" routerLinkActive="active" class="thumbnail">
            <i class="fa fa-plus-square fa-2x" aria-hidden="true"></i>
            <h6>Sink</h6>
        </a>
    </div>
</ng-template>

<ng-template #tmCSpec>
    <div class="btn-group">
    <span (click)="removeItem('counter')"><i class="fa fa-trash pull-right" aria-hidden="true"></i></span>
        <a [routerLink]="['options/counters']" routerLinkActive="active" class="thumbnail">
        <img *ngIf='sku.counter.urlSketch'  class="color" src="{{ sku.counter?.urlSketch }}" >
        <h6>{{ sku.counter.sku }}</h6>
        </a>
    </div>
</ng-template>

<ng-template #tmSink>
    <div class="btn-group">
    <span (click)="removeItem('counter')"><i class="fa fa-trash pull-right" aria-hidden="true"></i></span>
        <a [routerLink]="['options/counters']" routerLinkActive="active" class="thumbnail">
        <img *ngIf='sku.counter.imageSink'  class="color" src="{{ sku.counter?.imageSink }}" >
        <h6>{{ sku.counter.sink }}</h6>
        </a>
    </div>
</ng-template>

<ng-template #tmAccessory>
      <div class="btn-group" *ngFor="let access of sku.accessories; let i = index">
        <span (click)="remove(i)"><i class="fa fa-trash pull-right" aria-hidden="true"></i></span>
        <a [routerLink]="['options/accessories']" routerLinkActive="active" class="thumbnail">
            <img class="color" src="{{ access?.url }}" >
            <h6>{{access.sku}}</h6>
        </a>
      </div>
</ng-template>

<ng-template #tmPantry>
    <div class="btn-group">
    <span (click)="removeItem('pantry')"><i class="fa fa-trash pull-right" aria-hidden="true"></i></span>
        <a [routerLink]="['options/pantries']" routerLinkActive="active" class="thumbnail">
        <img *ngIf='sku.pantry.urlSketch'  class="color" src="{{ sku.pantry?.urlSketch }}" >
        <h6>{{ sku.pantry.sku }}</h6>
        </a>
    </div>
</ng-template>
<hr>
</div>
</div>
  `,
  styles: [`
  .thumbnail {
      text-align: center;
      min-width: 80px;
      padding: 2px;
      margin: 2px;
  }

  .color {
      width: 30px;
      height: 30px;
      border: 1px solid #f1f1f1;
      margin-top: 5px;
      margin-bottom: -5px;
  }
  .fa-trash {
      padding-top: 5px;
      padding-right: 8px;
      margin-left: -10px;
      color: red;
  }
  `]
})

export class ModsOrderComponent {
  page: string;
  sku$: Observable<Sku>;
  access$: Accessory[];

  constructor(
      private mods: ModsService,
      private toast: ToastService,
      private router: Router,
      private store: Store<AppState>
      ) {
    this.sku$ = this.store.select(state => state.sku);
    this.mods.currentPage.subscribe(page => this.page = page);
}

remove (i) {
    this.sku$.take(1).subscribe( sku => {
      this.access$ = sku.accessories;
    });
    let array = this.access$;
    _.pullAt(array, i);
    this.store.dispatch(new SkuActions.RemoveAccessory(array));
  }

  removeItem (value) {
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
