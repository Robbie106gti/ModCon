import { Component, OnInit, Input } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { VanityService } from '../vanities/shared/vanity.service';
import { Vanity, Skews } from '../vanities/shared/vanity';
import { AppState } from '../../state/state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Sum } from '../../state/sum/sum.model';

@Component({
  selector: 'dis-usa-price',
  template: `
<table class="table table-striped table-hover table-sm" *ngIf="sum$ | async as sum">
  <thead>
    <tr>
      <th>
        <h3>{{vanity.title}}</h3>
      </th>
      <th></th>
      <th colspan="4">Materials</th>
    </tr>
    <tr>
      <th>Skews</th>
      <th>active</th>
      <th>Paint & Alder @ {{ sum.ncDiscount | percent}}</th>
      <th>Walnut and Oak @ {{sum.WalnutOak | percent}}</th>
      <th>Textured Melamine @ {{ sum.TM | percent}}</th>
      <th>Euro @ {{ sum.euro | percent}}</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let skew of skews | async">
      <td>{{skew.title}}</td>
      <td *ngIf="skew.active">
        <i class="fa fa-check-square-o" aria-hidden="true"></i>
      </td>
      <td *ngIf="!skew.active">
        <i class="fa fa-square-o" aria-hidden="true"></i>
      </td>
      <td>US $ {{((skew.canDollar * sum.ncDiscount) * sum.usd) | number:'2.2-2'}}</td>
      <td *ngIf="vanity.color.waoa; else empty">
        $ {{(((skew.canDollar * sum.ncDiscount) * sum.usd) * sum.WalnutOak) | number:'2.2-2'}}</td>
      <td *ngIf="vanity.color.tm; else empty">
        $ {{(((skew.canDollar * sum.ncDiscount) * sum.usd) * sum.TM) | number:'2.2-2'}}</td>
      <td *ngIf="vanity.color.euro; else empty">
        $ {{(((skew.canDollar * sum.ncDiscount) * sum.usd) * sum.euro) | number:'2.2-2'}}</td>
    </tr>
  </tbody>
</table>
<br>
<hr>

<ng-template #empty>
  <td> - </td>
</ng-template>
  `
})
export class DisUsaPriceComponent implements OnInit {
  [x: string]: any;
  @Input() vanity: Vanity;
  skews: FirebaseListObservable<Skews[]>;
  sum$: Observable<Sum>;

  constructor(private vanitySvc: VanityService, private store: Store<AppState>) {
    this.sum$ = this.store.select(state => state.sum);
  }

  ngOnInit() {
    this.skews = this.vanitySvc.getSkewsList(this.vanity.$key);
  }

  onSelect(vanity: Vanity) {
    this.router.navigate(['dashboard/vanity', vanity.$key]);
  }
}
