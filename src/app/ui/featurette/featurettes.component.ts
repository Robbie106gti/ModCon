import { Component, OnInit, Input  } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Featurette } from './featurette';
import { SharedService } from '../../home/shared/shared.service';
import { SpinnerService } from "../loading-spinner/spinner.service";

@Component({
  selector: 'featurettes',
  template: `
  <featurette *ngFor="let featurette of featurettes | async" [featurette]='featurette'></featurette>
`
})
export class FeaturettesComponent implements OnInit {
  featurettes: FirebaseListObservable<Featurette[]>;
  values: any;

constructor(
  private itemSvc: SharedService,
  private spinner: SpinnerService
  ) { }

ngOnInit() {
  this.featurettes = this.itemSvc.getFeaturettes();
  this.spinner.changeSpinner('false');
}

}
