import { Component, OnInit } from '@angular/core';
import { Skews } from '../../../../dashboard/vanities/shared/vanity';
import { VanityService } from '../../../../dashboard/vanities/shared/vanity.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ActivatedRoute } from '@angular/router';
import { SpinnerService } from '../../../../ui/loading-spinner/spinner.service';
import { SharedService } from '../../../shared/shared.service';

@Component({
  selector: 'skew',
  template: `
    <div class="col-xs-12 col-sm-12">
      <ol class="breadcrumb">
        <li><a [routerLink]="['']">Home</a></li>
        <li><a [routerLink]="['../']">Vanities</a></li>
        <li class="active">{{title}}</li>
      </ol>
      <div class="wrapper">
          <skew-view *ngFor="let skew of skews | async" [skew]='skew'></skew-view>
      </div>
    </div>
  `,
  styles: [`
  .wrapper {
    margin: 0 auto;
    display: -ms-grid;
    display: grid;
    -ms-grid-columns: (minmax(15em, 1fr))[auto-fit];
        grid-template-columns: repeat(auto-fit, minmax(15em, 1fr));
    grid-gap: 1em;
  }
}
  `]
})
export class SkewComponent implements OnInit {
  skews: FirebaseListObservable<Skews[]>;
  title: string;
  query = {
    orderByChild: 'active',
    equalTo: true
  };

  constructor(
      private vanitySvc: VanityService,
      private route: ActivatedRoute,
      private spinner: SpinnerService,
      private shared: SharedService
      ) {
      this.spinner.changeSpinner('true');
    }

  ngOnInit() {
    this.title = this.route.snapshot.params.id;
    this.skews = this.vanitySvc.getSkewsList(this.title, this.query);
    this.skews.take(1).toPromise().then((data) => this.spinner.changeSpinner('false'));
  }
}
