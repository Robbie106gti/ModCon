import { Component, Input, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

import { Item } from '../../../../shared/shared';
import { SharedService } from '../../../../shared/shared.service';
import { ModsService } from './mods.service';

@Component({
  selector: 'pantry-order',
  template: `
  <span class="badge"><a [routerLink]="['../']"><i class="fa fa-arrow-circle-left" aria-hidden="true"></i> Back</a></span>
  <span class="badge"><small>{{(itemsPantries | async)?.length}}</small> Pantries</span>
  <hr>
  <pantry-view *ngFor="let itemPantry of itemsPantries | async" [itemPantry]='itemPantry'></pantry-view >
  `,
  styleUrls: ['./counter-order.component.css']
})
export class PantryOrderComponent implements OnInit  {
  items: FirebaseListObservable<Item[]>;
  itemsPantries: FirebaseListObservable<Item[]>;
  // title: string;
  title: string;
  titleSkew: string;
  private count: number;
  page: string;

  constructor(
      private db: AngularFireDatabase,
      private itemSvc: SharedService,
      private mods: ModsService,
      private route: ActivatedRoute
      ) {
        this.title = this.route.snapshot.parent.children['0'].parent.url['0'].path;
   }

  ngOnInit() {
    this.itemsPantries = this.itemSvc.getPantriesList(this.title);
    this.mods.currentPage.subscribe(page => this.page = page);
    this.mods.changePage('pantries');
  }
}
