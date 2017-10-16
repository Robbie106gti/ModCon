import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as _ from 'lodash';

import { Item } from '../../../../shared/shared';
import { ModsService } from './mods.service';
import { SharedService } from '../../../../shared/shared.service';

@Component({
  selector: 'color-order',
  template: `
  <span class="badge"><a [routerLink]="['../']"><i class="fa fa-arrow-circle-left" aria-hidden="true"></i> Back</a></span>
  <span class="badge"><small>{{(itemsMat | async)?.length}}</small> Types of Material</span>
    <hr>
    <div class="wrapper">
      <mat-view *ngFor="let itemMat of itemsMat | async" [itemMat]='itemMat' class="{{itemMat.$key}}"></mat-view >
    </div>
  `,
  styles: [`
  a {
      color: #fff;
    }

  .badge {
    margin-left: 20px;
  }
  .wrapper {
    display: grid;
    grid-gap: 1em;
    grid-auto-rows: minmax(100px, auto);
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (min-width: 1250px){
    .wrapper {
      grid-template-columns: repeat(3, 1fr);
    }

  }
  @media screen and (max-width: 1250px){
    .wrapper {
      grid-template-columns: repeat(2, 1fr);
    }

  }
  @media screen and (max-width: 993px){
    .wrapper {
      grid-template-columns: repeat(1, 1fr);
    }

  }

  .Paint {
      width: 75%;
      border-top: 3px solid #22BDFD;
      border-left: 3px solid #22BDFD;
  }

  .Wood {
      width: 75%;
      border-left: 3px solid #FCE24C;
      border-top: 3px solid #FCE24C;
  }

  .Euro {
    width: 75%;
      border-left: 3px solid #238500;
      border-top: 3px solid #238500;
  }

  .Textured {
    width: 75%;
      border-left: 3px solid #FF3032;
      border-top: 3px solid #FF3032;
  }
  `]
})

export class ColorOrderComponent implements OnInit {
  id: any;
  title: string;
  titleSkew: string;
  itemsMat: FirebaseListObservable<Item[]>;
  page: string;

  constructor(
      private route: ActivatedRoute,
      private db: AngularFireDatabase,
      private mods: ModsService,
      private itemSrv: SharedService
      ) {
        this.title = this.route.snapshot.parent.children['0'].parent.url['0'].path;
        this.titleSkew = this.route.snapshot.parent.children['0'].parent.url[1].path;
        // console.log(this.title + ' , ' + this.titleSkew);
}

  ngOnInit() {
    this.itemsMat = this.itemSrv.getMaterialList(this.title);
    this.mods.currentPage.subscribe(page => this.page = page);
    this.mods.changePage('color');
  }
}
