import { Component, OnInit, Input } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { ActivatedRoute } from '@angular/router';

import { VanityService } from '../../../shared/vanity.service';
import { Skews } from '../../../shared/vanity';
import { Access } from '../../../../access/shared/access';
import { Top } from '../../../../tops/shared/top';
import { TopsService } from '../../../../tops/shared/top.service';
import { HomeService } from '../../../../shared/home.service';
import { AppState } from '../../../../../state/state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Sum } from '../../../../../state/sum/sum.model';
import { Option, Default } from '../../../../options/option';

@Component({
  selector: 'skew-list',
  templateUrl: './skew-list.component.html',
  styleUrls: ['./skew-list.component.css']
})
export class SkewsListComponent implements OnInit {
  skews: FirebaseListObservable<Skews[]>;
  @Input() accesss: Access;
  @Input() options: Option[];
  @Input() defaults: Default[];
  tops: FirebaseListObservable<Top[]>;
  numbers: any;
  title: string;
  usd: number;
  sum$: Observable<Sum>;

  constructor(
    private vanitySvc: VanityService,
    private topSvc: TopsService,
    private route: ActivatedRoute,
    private home: HomeService,
    private store: Store<AppState>
  ) {
    this.sum$ = this.store.select(state => state.sum);
    this.sum$.subscribe(sum => (this.usd = sum.usd));
  }

  ngOnInit() {
    this.title = this.route.snapshot.params.id;
    this.skews = this.vanitySvc.getSkewsList(this.title);
    this.tops = this.topSvc.getItemsList();
  }

  changeUSD(value) {
    const key = 'numbers';
    const obj = { usd: value };
    this.home.updateNumbers(key, obj);
  }
}
