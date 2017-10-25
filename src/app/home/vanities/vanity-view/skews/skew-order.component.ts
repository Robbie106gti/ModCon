import { Component, Input, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs/Rx';

import { AccessService } from '../../../../dashboard/access/shared/access.service';
import { Access } from '../../../../dashboard/access/shared/access';
import { SharedService } from '../../../../home/shared/shared.service';
import { Item, Numbers } from '../../../../home/shared/shared';
import { Skews, Vanity } from '../../../../dashboard/vanities/shared/vanity';
import { Pantry } from '../../../../dashboard/pantries/shared/pantry';
import { ModsService } from '../../../../home/vanities/vanity-view/skews/mods/mods.service';
import { SpinnerService } from '../../../../ui/loading-spinner/spinner.service';
import { SkuFacade } from '../../../../state/config/sku.facade';
import { Sku, Cabinet } from '../../../../state/config/sku.model';
import * as SkuActions from '../../../../state/config/sku.actions';
import { AppState } from '../../../../state/state';
import { User } from '../../../../state/user/user.model';
import { Sum } from '../../../../state/sum/sum.model';

@Component({
  selector: 'skew-order',
  templateUrl: './skew-order.component.html',
  styleUrls: ['./skew-order.component.css']
})
export class SkewOrderComponent implements OnInit  {
  sku$: Observable<Sku>;
  sku: Sku;
  user$: Observable<User>;
  sum$: Observable<Sum>;
  total: number;
  subtotal: number;
  accessoriesTotal: number;
  mCost: number = 1;
  cabinet: Cabinet;
  skew: FirebaseObjectObservable<Skews>;
  vanity: FirebaseObjectObservable<Vanity>;
  items: FirebaseListObservable<Item[]>;
  itemsMat: FirebaseListObservable<Item[]>;
  sku2: any;
  title: string;
  titleSkew: string;
  numberSub: Numbers;
  public counter$: Observable<any> = new Subject<any>()
    .scan((acc: number, current: number): number => acc + current)
    .map((value: number): string => `Sum of clicks: ${value}`);

  constructor(
      private db: AngularFireDatabase,
      private mods: ModsService,
      private route: ActivatedRoute,
      private spinner: SpinnerService,
      private shared: SharedService,
      private store: Store<AppState>,
      private skuService: SkuFacade,
      private router: Router
      ) {
      this.spinner.changeSpinner('true');
      this.sku$ = this.store.select(state => state.sku);
      this.user$ = this.store.select(state => state.user);
      this.sum$ = this.store.select(state => state.sum);
      this.sku$.subscribe(sku => {
        this.total = 0;
        this.subtotal = 0;
        this.accessoriesTotal = 0;
        this.sku = sku;

        if (sku.cabinet === null) { this.subtotal += 0; } else { this.subtotal += sku.cabinet.cost; }
        if (sku.pantry === null) { this.subtotal += 0; } else { this.subtotal += sku.pantry.total; }
        if (sku.material === null ) { this.subtotal += 0; } else { this.mCost = sku.material.cost; }
        this.total = this.subtotal * this.mCost;
        if (sku.counter === null) { this.total += 0; } else { this.total += sku.counter.cost; }
        if (sku.accessories === null) { this.accessoriesTotal = 0;
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

  ngOnInit() {
    // console.log(this.route.snapshot);
    this.titleSkew = this.route.snapshot.params.id;
    this.title = this.route.snapshot.url[0].path;
    this.items = this.shared.getAccessList(this.title, this.titleSkew);
    this.skew = this.shared.getSkew(this.title, this.titleSkew);
    this.vanity = this.shared.getVanity(this.title);
    this.itemsMat = this.shared.getMaterialList(this.title);
    this.mods.changePage('options');
    this.skew.take(1).toPromise()
             .then((data) => this.spinner.changeSpinner('false'))
             .then((data) => this.skew.subscribe((obj) => {
          this.sku2 = obj;
          this.editCabinet();
      }));
  }

  editCabinet() {
    // console.log(this.sku2);
    this.cabinet = {
      line: this.title,
      sku: this.titleSkew,
      cost: _.toNumber(this.sku2.canDollar),
      urlSketch: this.sku2.drawing.url,
      sampleImage: 'none'
    };

    this.store.dispatch(new SkuActions.AddCabinet(this.cabinet));
  }

  setOrder() {
    let totals = {
      total: this.total,
      subtotal: this.subtotal,
      accessoriesTotal: this.accessoriesTotal
    };

    this.user$.take(1).subscribe( user => {
    this.mods.saveOrder(user, totals, this.sku);
    this.router.navigate(['/home/order/' + user.orderId]);
    console.log(user);
    console.log(totals);
    console.log(this.sku);
    });
  }

}
