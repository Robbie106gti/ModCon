import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as _ from 'lodash';
import { SharedService } from '../../../home/shared/shared.service';
import { Vanity } from '../../../dashboard/vanities/shared/vanity';
import { VanityService } from '../../../dashboard/vanities/shared/vanity.service';
import { SpinnerService } from '../../../ui/loading-spinner/spinner.service';

@Component({
  selector: 'vanityList-view',
  template: `
<div class="col-xs-12 col-sm-12">
  <ol class="breadcrumb">
    <li><a [routerLink]="['']">Home</a></li>
    <li class="active">Vanities</li>
  </ol>
  <div class="wrapper">
    <vanity-view class="thumbnail" *ngFor="let vanity of vanities | async" [vanity]='vanity'></vanity-view>
  </div>
</div>
  `,
  styles: [`
  .wrapper {
    display: grid;
    grid-gap: 1em;
    grid-auto-rows: minmax(100px, auto);
  }
  @media screen and (min-width: 1250px){
    .wrapper {
      grid-template-columns: repeat(5, 1fr);
    }

  }
  @media screen and (max-width: 1250px){
    .wrapper {
      grid-template-columns: repeat(3, 1fr);
    }

  }
  @media screen and (max-width: 1000px){
      .wrapper {
          grid-template-columns: repeat(2, 1fr);
      }

  }

  @media screen and (max-width: 705px){
    .wrapper {
        grid-template-columns: repeat(2, 1fr);
    }
  }
}
  `]
})

export class VanityListViewComponent implements OnInit {
  id: any;
  title: string;
  vanities: FirebaseListObservable<Vanity[]>;

  constructor(
      private route: ActivatedRoute,
      private db: AngularFireDatabase,
      private itemSrv: SharedService,
      private vanitySvc: VanityService,
      private spinner: SpinnerService
      ) {
        this.spinner.changeSpinner('true');
        this.title = this.route.snapshot.params.id;
        this.vanities = this.vanitySvc.getItemsList();
}

  ngOnInit() {
      this.vanities.take(1).toPromise().then((data) => this.spinner.changeSpinner('false'));
  }
}
