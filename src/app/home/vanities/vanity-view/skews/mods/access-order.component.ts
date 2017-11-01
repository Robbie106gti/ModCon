import { Component, Input, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

import { SharedService } from '../../../../shared/shared.service';
import { Item } from '../../../../shared/shared';
import { ModsService } from '../../../../vanities/vanity-view/skews/mods/mods.service';
import { Access } from '../../../../../dashboard/access/shared/access';

@Component({
  selector: 'access-order',
  template: `
  <span class="badge"><a [routerLink]="['../']"><i class="fa fa-arrow-circle-left" aria-hidden="true"></i> Back</a></span>
  <span class="badge"><small>{{ filteredArray?.length}}</small> Accessories</span>
  <hr>
  <div class="wrapper">
    <access-view  class="thumbnail" *ngFor="let itemAccess of filteredArray" [itemAccess]='itemAccess'></access-view >
  </div>
  `,
  styleUrls: ['./counter-order.component.css']
})
export class AccessOrderComponent implements OnInit  {
  items: FirebaseListObservable<Item[]>;
  itemsAccess: FirebaseListObservable<Item[]>;
  accessories: FirebaseListObservable<Access[]>;
  // title: string;
  title: string;
  titleSkew: string;
  private count: number;
  page: string;
  filteredArray: Array<AllAccess>;

  constructor(
      private db: AngularFireDatabase,
      private itemSvc: SharedService,
      private mods: ModsService,
      private route: ActivatedRoute
      ) {
        this.title = this.route.snapshot.parent.children['0'].parent.url['0'].path;
        this.titleSkew = this.route.snapshot.parent.children['0'].parent.url[1].path;
   }

  ngOnInit() {
    this.itemsAccess = this.itemSvc.getAccessList(this.title, this.titleSkew);
    this.accessories = this.itemSvc.getAccessories();
    this.mods.currentPage.subscribe(page => this.page = page);
    this.mods.changePage('accessories');
    this.reduceAccessories();
  }

  reduceAccessories () {
    let allAccessories: Array<Access>;
    let optionAccess: Array<AllAccess>;
    this.accessories.take(1).subscribe(i => {
      allAccessories = i;
      // console.log(i);
      this.itemsAccess.take(1).subscribe(o => {
        optionAccess = o;
        // console.log(o);
        this.filteredArray = allAccessories.filter( el => {
          return optionAccess.some( f => {
            return f.$key === el.$key;
          });
        });
        // console.log(filteredArray);
      });
    });
    return this.filteredArray;
  }

}

export interface AllAccess {
  $key: string;
  active: boolean;
}
