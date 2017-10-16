import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as _ from 'lodash';

import { Item } from '../../../../shared/shared';
import { SharedService } from '../../../../shared/shared.service';

@Component({
  selector: 'mat-view',
  template: `
    <h3 class="title">{{itemMat.$key}} <span class="badge">{{(itemsColor | async)?.length}}</span></h3>
    <div class="colors">
        <color-view *ngFor="let itemColor of itemsColor | async" [itemMat]='itemMat' [itemColor]='itemColor'></color-view>
    </div>
  `,
  styles: [`
  .title {
      padding-left: 10px;
  }
  .colors {
    padding-left: 10px;
  }
  `]
})

export class MatViewComponent implements OnInit {
  id: any;
  title: string;
  @Input()  itemMat: Item;
  itemsColor: FirebaseListObservable<Item[]>;

  constructor(
      private route: ActivatedRoute,
      private db: AngularFireDatabase,
      private itemSrv: SharedService
      ) {
    this.title = this.route.snapshot.parent.children['0'].parent.url['0'].path;
}

  ngOnInit() {
      this.itemsColor = this.itemSrv.getColors(this.title, this.itemMat.$key);
  }
}
