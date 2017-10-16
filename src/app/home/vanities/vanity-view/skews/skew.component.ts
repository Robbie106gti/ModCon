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
    display: grid;
    grid-gap: 1em;
    grid-auto-rows: minmax(100px, auto);
  }
  @media screen and (min-width: 1350px){
    .wrapper {
      grid-template-columns: repeat(8, 1fr);
    }

  }
  @media screen and (max-width: 1350px){
    .wrapper {
      grid-template-columns: repeat(6, 1fr);
    }

  }
  @media screen and (max-width: 1150px){
    .wrapper {
      grid-template-columns: repeat(5, 1fr);
    }

  }
  @media screen and (max-width: 1000px){
      .wrapper {
          grid-template-columns: repeat(4, 1fr);
      }

  }

  @media screen and (max-width: 705px){
    .wrapper {
        grid-template-columns: repeat(3, 1fr);
    }
  }
  @media screen and (max-width: 550px){
    .wrapper {
        grid-template-columns: repeat(2, 1fr);
    }
  }
}
  `]
})
export class SkewComponent implements OnInit {
  skews: FirebaseListObservable<Skews[]>;
  title: string;

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
    this.skews = this.vanitySvc.getSkewsList(this.title);
    this.skews.take(1).toPromise().then((data) => this.spinner.changeSpinner('false'));
  }
}
