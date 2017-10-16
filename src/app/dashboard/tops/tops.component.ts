import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ActivatedRoute } from '@angular/router';
import { TopsService } from './shared/top.service';
import { Top } from './shared/top';

@Component({
  selector: 'tops',
  template: `
    <div class="row">
    <hr>
        <div class="col-xs-6 col-sm-7 col-sm-offset-">
            <h1>Counters Tops</h1>
        </div>
        <top-form class="col-xs-6 col-sm-3"></top-form>
    </div>
    <div class="row">
        <div *ngFor="let top of tops | async">
            <top-detail [top]='top'></top-detail>
        </div>
    </div>
  `
})
export class TopsComponent implements OnInit {
  tops: FirebaseListObservable<Top[]>;

  constructor(
      private topSvc: TopsService,
      private route: ActivatedRoute
      ) { }

  ngOnInit() {
    this.tops = this.topSvc.getItemsList();
   // this.vanities.subscribe(() => this.showSpinner = false);
  }
}
