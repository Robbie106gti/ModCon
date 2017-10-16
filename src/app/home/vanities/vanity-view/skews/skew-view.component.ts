
import { Component, Input, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as _ from 'lodash';
import { Skews } from '../../../../dashboard/vanities/shared/vanity';
import { Item } from '../../../../home/shared/shared';
import { User } from '../../../../state/user/user.model';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../../../../state/state';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../../shared/shared.service';
import { Sum } from '../../../../state/sum/sum.model';

@Component({
  selector: 'skew-view',
  template: `
<div class="" *ngIf="sum$ | async as sum">
  <div class="thumbnail" *ngIf="user$ | async as user">
    <a [routerLink]="[skew.title, 'options']">
      <img class="img" src="{{ skew.drawing?.url }}" alt="{{ skew.title || 'missing title' }}">
    </a>
    <div class="caption">
      <a [routerLink]="[skew.title, 'options']">
        <h4>{{ skew.title || 'missing title' }}</h4>
        <p *ngIf="user$ | async as user">Base price:<br>
          <span *ngIf="user.currency === 'can'">CAN $ {{ skew.canDollar | number:'2.2-2'}}</span>
          <span *ngIf="user.currency === 'usd'">USD $ {{ skew.canDollar * sum.usd | number:'2.2-2'}}</span>
        </p>
      </a>
      <hr>
      <div class="btn-group">
        <button type="button" class="btn btn-info btn-xs dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i class="fa fa-cube" aria-hidden="true"></i> Accessories
          <span class="badge"><small>{{(items | async)?.length}}</small></span>
        </button>
        <ul class="dropdown-menu">
            <li *ngFor="let item of items | async">
              <a routerLink="/home/demo/{{ item.$key }}"><span type="button" class="btn btn-xs">{{item.$key}}</span></a>
            </li>
        </ul>
      </div>
    </div>
  </div>
</div>
  `,
  styles: [`
    .img {
     max-height: 125px;
    }

li:hover {
    background-color: #647DB3;
}
  `]
})
export class SkewViewComponent implements OnInit  {
  @Input() skew: Skews;
  items: FirebaseListObservable<Item[]>;
  user$: Observable<User>;
  sum$: Observable<Sum>;
  title: string;
  // tslint:disable-next-line:max-line-length
  noImage: 'https://firebasestorage.googleapis.com/v0/b/modcon-2b3c7.appspot.com/o/assets%2FnoImage-01.jpg?alt=media&token=6a82abe8-8d8b-4ad0-93c5-b6398c03fc24';

  constructor(
      private db: AngularFireDatabase,
      private store: Store<AppState>,
      private itemSvc: SharedService,
      private route: ActivatedRoute
      ) {
   }

  ngOnInit() {
    this.title = this.route.snapshot.params.id;
    this.items = this.itemSvc.getAccessList(this.title, this.skew.$key);
    this.user$ = this.store.select(state => state.user);
    this.sum$ = this.store.select(state => state.sum);
  }

}
