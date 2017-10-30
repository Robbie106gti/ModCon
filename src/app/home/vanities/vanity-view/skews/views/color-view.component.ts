import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as _ from 'lodash';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

import { Item } from '../../../../shared/shared';
import { Color } from '../../../../../dashboard/materials/shared/material';
import { ModsService } from '../mods/mods.service';
import { SharedService } from '../../../../shared/shared.service';
import { ToastService } from '../../../../shared/toast.service';
import { Sku, Material } from '../../../../../state/config/sku.model';
import * as SkuActions from '../../../../../state/config/sku.actions';
import { AppState } from '../../../../../state/state';
import { Sum } from '../../../../../state/sum/sum.model';

@Component({
  selector: 'color-view',
  template: `
  <div class="media"><a (click)="addColor()">
      <div class="media-left">
        <img class="media-object access" src="{{ color?.color?.url || '#none'}}" alt="...">
      </div>
      <div class="media-body">
        <h6 class="media-heading"><b>{{ color?.title }}</b></h6>
      </div></a>
  </div>
  `,
  styles: [`
  .access{
    max-height: 150px;
    border-left: 1px solid #f1f1f1;
    box-shadow: 5px 5px 3px #ccc;
    cursor: pointer;
  }

  .media-body {
    position: relative;
    left: -150px;
    top: 125px;
    min-width: 130px;
    max-width: 130px;
    padding-top: 5px;
    text-align: center;
    background-color: #fff;
  }

  .access:hover {
    border: 1px solid #80D0FF;
    max-height: 160px;
  }

  .media-heading:hover {
    text-decoration: underline 1px #80D0FF;
  }
  `]
})

export class ColorViewComponent implements OnInit {
  id: any;
  title: string;
  private options: string;
  @Input()  itemColor: Item;
  @Input()  itemMat: Item;
  color: Color;
  material: Material;
  sum$: Observable<Sum>;

  constructor(
      private route: ActivatedRoute,
      private db: AngularFireDatabase,
      private mods: ModsService,
      private itemSrv: SharedService,
      private toast: ToastService,
      private store: Store<AppState>
      ) {
    this.title = this.route.snapshot.url[0].path;
}

  ngOnInit() {
     this.options = 'colors';
     this.sum$ = this.store.select(state => state.sum);
     this.itemSrv.getColor(this.itemMat.$key, this.itemColor.$key).subscribe( color => this.color = color);
  }

  addColor() {
    // console.log(this.color);
    let content = 'You have choosen ' + this.itemColor.$key + ' - ' + this.itemMat.$key + ' which has been added to your order.';
    let style = 'success';
    let mCost: number;
    this.toast.sendMessage(content, style);
    this.sum$.take(1).subscribe( sum => {
     mCost = sum[this.color.price];
    });

    this.material = {
      material: this.itemMat.$key,
      color: this.itemColor.$key,
      cost: mCost,
      cat: this.color.price,
      materialImage: this.color.color.url,
    };

    this.store.dispatch(new SkuActions.AddMaterial(this.material));
  }
}
