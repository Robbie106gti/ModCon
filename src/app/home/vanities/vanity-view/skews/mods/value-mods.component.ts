import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Skews } from '../../../../../dashboard/vanities/shared/vanity';
import { AppState } from '../../../../../state/state';
import { Sku } from '../../../../../state/config/sku.model';
import { User } from '../../../../../state/user/user.model';
import { Sum } from '../../../../../state/sum/sum.model';
import { ModsService } from './mods.service';

@Component({
  selector: 'value-mods',
  template: `
    <div class="thumbnail" *ngIf="user$ | async as user">
      <div class="caption"  *ngIf="sku$ | async as sku">
      <div class="row">
        <div class="col-xs-12">
        <h3>Customizations SKU:</h3>
        <hr>
          <div *ngIf="sum$ |async as sum">
            <div *ngIf="sku.cabinet?.sku">
              <h4>SKU: {{ sku.cabinet?.sku }}</h4>
              <span>
                {{ user?.currency | uppercase }}$
                <span *ngIf="user.currency === 'can'"> {{ sku.cabinet?.cost * sum?.can | number:'1.2-2' }}</span>
                <span *ngIf="user.currency === 'usd'"> {{ sku.cabinet?.cost * sum?.usd | number:'1.2-2' }}</span>
              </span>
            </div>
            <div *ngIf="sku.material?.cost">
              <h4>Material</h4>
              <span>
              {{ user?.currency | uppercase }}$
              <span *ngIf="user.currency === 'can'"> {{ ((sku.cabinet?.cost * sku.material?.cost) - sku.cabinet?.cost) * sum?.can | number:'1.2-2' }}</span>
              <span *ngIf="user.currency === 'usd'"> {{ ((sku.cabinet?.cost * sku.material?.cost) - sku.cabinet?.cost) * sum?.usd | number:'1.2-2' }}</span>
              </span>
            </div>
            <div *ngIf="sku.counter?.cost">
              <h4>Counter top</h4>
              {{ user?.currency | uppercase }}$
              <span *ngIf="user.currency === 'can'"> {{ sku.counter?.cost * sum?.can | number:'1.2-2' }}</span>
              <span *ngIf="user.currency === 'usd'"> {{ sku.counter?.cost * sum?.usd | number:'1.2-2' }}</span>
            </div>
            <div *ngIf="sku.pantry?.cost">
              <h4>Pantry</h4>
              <span>
              {{ user?.currency | uppercase }}$
              <span *ngIf="user.currency === 'can'"> {{ (sku.pantry?.total * mCost) * sum?.can | number:'1.2-2' }}</span>
              <span *ngIf="user.currency === 'usd'"> {{ (sku.pantry?.total * mCost) * sum?.usd | number:'1.2-2' }}</span>
              </span>
            </div>
            <h4 *ngIf="accessoriesTotal !== '0'">Accessories</h4>
            <div *ngFor="let access of sku.accessories">
              <h6>Accessory {{ access.sku }}</h6>
              <p >
              {{ user?.currency | uppercase }}$
              <span *ngIf="user.currency === 'can'"> {{ access?.total * sum?.can | number:'1.2-2' }}</span>
              <span *ngIf="user.currency === 'usd'"> {{ access?.total * sum?.usd | number:'1.2-2' }}</span>
              </p>
            </div>
            <div>
              <h4>Total</h4>
              <span>
              {{ user?.currency | uppercase }}$
              <span *ngIf="user.currency === 'can'"> {{ total * sum?.can | number:'1.2-2' }}</span>
              <span *ngIf="user.currency === 'usd'"> {{ total * sum?.usd | number:'1.2-2' }}</span>
              </span>
            </div>
            <br>
          </div>
          </div>
          </div>
        </div>
    </div>
  `,
  styleUrls: ['./counter-order.component.css']
})
export class ValueModsComponent {
  @Input()
  skew: Skews;
  sku$: Observable<Sku>;
  sku: Sku;
  user$: Observable<User>;
  sum$: Observable<Sum>;
  total: number;
  subtotal: number;
  accessoriesTotal: number;
  mCost: number = 1;

  constructor(
    private mods: ModsService,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.sku$ = this.store.select(state => state.sku);
    this.user$ = this.store.select(state => state.user);
    this.sum$ = this.store.select(state => state.sum);
    this.sku$.subscribe(sku => {
      this.total = 0;
      this.subtotal = 0;
      this.accessoriesTotal = 0;
      this.sku = sku;

      if (sku.cabinet === null) {
        this.subtotal += 0;
      } else {
        this.subtotal += sku.cabinet.cost;
      }
      if (sku.pantry === null) {
        this.subtotal += 0;
      } else {
        this.subtotal += sku.pantry.total;
      }
      if (sku.material === null) {
        this.subtotal += 0;
      } else {
        this.mCost = sku.material.cost;
      }
      this.total = this.subtotal * this.mCost;
      if (sku.counter === null) {
        this.total += 0;
      } else {
        this.total += sku.counter.cost;
      }
      if (sku.accessories === null) {
        this.accessoriesTotal = 0;
      } else {
        sku.accessories.forEach(element => {
          this.accessoriesTotal += element.total;
        });
        this.total += this.accessoriesTotal;
      }
      // console.log('Total: ' + this.total + ' Subtotal: ' + this.subtotal + ' Accessories: ' + this.accessoriesTotal);
      // console.log(sku);
    });
  }

  setOrder() {
    let totals = {
      total: this.total,
      subtotal: this.subtotal,
      accessoriesTotal: this.accessoriesTotal
    };

    this.user$.take(1).subscribe(user => {
      this.mods.saveOrder(user, totals, this.sku);
      this.router.navigate(['/home/order/' + user.orderId]);
    });
  }
}
