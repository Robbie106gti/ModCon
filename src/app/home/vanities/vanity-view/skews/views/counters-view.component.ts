import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as _ from 'lodash';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

import { Item } from '../../../../shared/shared';
import { ModsService } from '../mods/mods.service';
import { SharedService } from '../../../../shared/shared.service';
import { ToastService } from '../../../../shared/toast.service';
import { CounterColor } from '../../../../../state/config/sku.model';
import * as SkuActions from '../../../../../state/config/sku.actions';
import { AppState } from '../../../../../state/state';

@Component({
  selector: 'counter-view',
  template: `
    <div class="media">
      <a (click)="addColor()">
        <img class="media-object access" src="{{ counter?.images?.mainImg.url || '#none'}}" >
        <div class="title">
          <h5 class="media-heading"><b>{{ counter?.title}}</b></h5>
        </div>
      </a>
    </div>
  `,
  styles: [`
  .access{
    max-height: 150px;
    border-left: 1px solid #f1f1f1;
    box-shadow: 5px 5px 3px #ccc;
  }

  .access:hover {
    border: 1px solid #80D0FF;
    max-height: 160px;
    padding-top: 0px;
    margin-bottom: -10px;
  }

  .title {
    top: -25px;
    left: 10px;
    position: relative;
    width: 130px;
    height: 2em;
    text-align: center;
    background-color: #fff;
  }

  .bottom{
      margin-bottom: 25px;
  }

  .media-body {
    position: relative;
    min-width: 130px;
    max-width: 130px;
    padding-top: 5px;
    text-align: center;
    background-color: #fff;
  }

  .title:hover {
    text-decoration: underline 1px #80D0FF;
  }
  `]
})

export class CounterViewComponent implements OnInit {
  ccolor: CounterColor;
  id: any;
  title: string;
  @Input()  itemCounter: Item;
  counter: any;
  counter2: string;

  constructor(
      private route: ActivatedRoute,
      private db: AngularFireDatabase,
      private mods: ModsService,
      private itemSrv: SharedService,
      private toast: ToastService,
      private store: Store<AppState>
      ) {
      this.title = this.route.snapshot.params.id;
}

  ngOnInit() {
     this.itemSrv.getCounter(this.itemCounter.$key).subscribe(counter => this.counter = counter);
     this.mods.currentCounter.subscribe(counter => this.counter2 = counter);
  }
  addColor() {
    let content = 'You have choosen ' + this.itemCounter.$key + ' which has been added to your order.';
    let style = 'success';
    this.toast.sendMessage(content, style);
    this.ccolor = {
      materialImage: this.counter.images['mainImg'].url,
      color: this.counter.title
    };
    this.store.dispatch(new SkuActions.AddCounterColor(this.ccolor));
    this.mods.changeCounter('false');
  }
}
