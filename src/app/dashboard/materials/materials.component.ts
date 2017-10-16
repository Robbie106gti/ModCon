import { Component, OnInit } from '@angular/core';
import { Mat } from './shared/material';
import { MatService } from './shared/materials.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'materials',
  template: `
    <div class="row">
    <hr>
        <div class="col-xs-6 col-sm-7 col-sm-offset-">
            <h1>Materials</h1>
        </div>
        <material-form class="col-xs-6 col-sm-3"></material-form>
    </div>
    <div class="row">
        <div *ngFor="let mat of mats | async">
            <material-detail [mat]='mat'></material-detail>
        </div>
    </div>
  `
})
export class MaterialsComponent implements OnInit {
  mats: FirebaseListObservable<Mat[]>;

  constructor(
      private matSvc: MatService,
      private route: ActivatedRoute
      ) { }

  ngOnInit() {
    this.mats = this.matSvc.getItemsList();
   // this.vanities.subscribe(() => this.showSpinner = false);
  }
}
