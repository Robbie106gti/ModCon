import { Component, OnInit } from '@angular/core';
import { Access } from './shared/access';
import { AccessService } from './shared/access.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'access',
  template: `
    <div class="row">
    <hr>
        <div class="col-xs-6 col-sm-7 col-sm-offset-">
            <h1>Accessories</h1>
        </div>
        <access-form class="col-xs-6 col-sm-3"></access-form>
    </div>
    <div class="row">
      <access-detail *ngFor="let access of accesss | async" [access]='access'></access-detail>
    </div>
  `
})
export class AccessComponent implements OnInit {
  accesss: FirebaseListObservable<Access[]>;

  constructor(
      private accessSvc: AccessService,
      private route: ActivatedRoute
      ) { }

  ngOnInit() {
    this.accesss = this.accessSvc.getItemsList();
   // this.vanities.subscribe(() => this.showSpinner = false);
  }
}
