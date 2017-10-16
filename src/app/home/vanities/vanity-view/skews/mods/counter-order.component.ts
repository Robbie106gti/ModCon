import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

import { Item } from '../../../../shared/shared';
import { SharedService } from '../../../../shared/shared.service';
import { ModsService } from './mods.service';
import { Sku } from '../../../../../state/config/sku.model';
import { AppState } from '../../../../../state/state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'counter-order',
  template: `
  <div class="row" *ngIf="sku$ | async as sku">
  <div class="col-md-12">
    <span class="badge"><a [routerLink]="['../']"><i class="fa fa-arrow-circle-left" aria-hidden="true"></i> Back</a></span>
    <span class="badge"><small>{{(itemsCounter | async)?.length}}</small> Counter Materials</span>
    <hr>
    <div *ngIf="counter === 'true'" class="modal">
      <div class="wrapper-counter notification">
        <counter-view *ngFor="let itemCounter of itemsCounter | async" [itemCounter]='itemCounter'></counter-view>
      </div>
    </div>
  </div>
  <div class="col-sm-12">
    <span class="badge"><small>{{(itemsTop | async)?.length}}</small> Counter Tops</span>
    <hr>
    <div class="wrapper">
      <top-view *ngFor="let itemTop of itemsTop | async" [itemTop]='itemTop'></top-view >
    </div>
  </div>
  <ng-template #tmTop>
  </ng-template>
  `,
  styleUrls: ['./counter-order.component.css']
})

export class CounterOrderComponent implements OnInit  {
  items: FirebaseListObservable<Item[]>;
  itemsCounter: FirebaseListObservable<Item[]>;
  itemsTop: FirebaseListObservable<Item[]>;
  title: string;
  titleSkew: string;
  page: string;
  sku$: Observable<Sku>;
  counter: string;

  constructor(
      private db: AngularFireDatabase,
      private itemSvc: SharedService,
      private mods: ModsService,
      private route: ActivatedRoute,
      private store: Store<AppState>
      ) {
        this.title = this.route.snapshot.parent.children['0'].parent.url['0'].path;
        this.titleSkew = this.route.snapshot.parent.children['0'].parent.url[1].path;
        this.sku$ = this.store.select(state => state.sku);
   }

  ngOnInit() {
    this.itemsCounter = this.itemSvc.getCounterList(this.title);
    this.itemsTop = this.itemSvc.getTopsList(this.title, this.titleSkew);
    this.mods.currentPage.subscribe(page => this.page = page);
    this.mods.currentCounter.subscribe(counter => this.counter = counter);
    this.mods.changePage('counters');
  }
}
