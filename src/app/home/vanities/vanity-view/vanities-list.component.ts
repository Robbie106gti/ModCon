import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AngularFireDatabase,
  FirebaseListObservable,
  FirebaseObjectObservable
} from 'angularfire2/database-deprecated';
import * as _ from 'lodash';
import { SharedService } from '../../../home/shared/shared.service';
import { Vanity } from '../../../dashboard/vanities/shared/vanity';
import { VanityService } from '../../../dashboard/vanities/shared/vanity.service';
import { SpinnerService } from '../../../ui/loading-spinner/spinner.service';
import { take, map } from '../../../../../node_modules/rxjs/operators';

@Component({
  selector: 'vanityList-view',
  template: `
<div class="col-xs-12 col-sm-12">
  <ol class="breadcrumb">
    <li><a [routerLink]="['']">Home</a></li>
    <li class="active">Vanities</li>
  </ol>
  <div class="wrapper">
    <vanity-view *ngFor="let vanity of vanities | async" [vanity]='vanity'></vanity-view>
  </div>
</div>
  `,
  styles: [
    `
      .wrapper {
        margin: 0 auto;
        display: -ms-grid;
        display: grid;
        -ms-grid-columns: (minmax(15em, 1fr)) [auto-fit];
        grid-template-columns: repeat(auto-fit, minmax(15em, 1fr));
        grid-gap: 1em;
      }
    `
  ]
})
export class VanityListViewComponent implements OnInit {
  id: any;
  title: string;
  vanities: FirebaseListObservable<Vanity[]>;
  query = {
    orderByChild: 'active',
    equalTo: true
  };

  constructor(
    private route: ActivatedRoute,
    private db: AngularFireDatabase,
    private itemSrv: SharedService,
    private vanitySvc: VanityService,
    private spinner: SpinnerService
  ) {
    this.spinner.changeSpinner('true');
    this.title = this.route.snapshot.params.id;
    this.vanities = this.vanitySvc.getItemsList(this.query);
  }

  ngOnInit() {
    this.vanities.pipe(
      take(1),
      map(() => this.spinner.changeSpinner('false'))
    );
  }
}
