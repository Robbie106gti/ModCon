import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
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
  templateUrl: './value-mods.html',
  styleUrls: ['./counter-order.component.css']
})
export class ValueModsComponent {
  @Input() skew: Skews;
  sku$: Observable<Sku>;
  sku: Sku;
  user$: Observable<User>;
  sum$: Observable<Sum>;
  total: number;
  subtotal: number;
  accessoriesTotal: number;
  mCost: number = 1;

  constructor(private mods: ModsService, private store: Store<AppState>, private router: Router) {
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
      // console.log('Total: ' + this.total + ' Subtotal: ' + this.subtotal + '
      // Accessories: ' + this.accessoriesTotal); console.log(sku);
    });
  }

  setOrder() {
    const totals = {
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
