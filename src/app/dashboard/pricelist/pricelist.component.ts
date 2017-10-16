import { Component, OnInit, ElementRef } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { ActivatedRoute } from '@angular/router';
import { VanityService } from '../vanities/shared/vanity.service';
import { Vanity } from '../vanities/shared/vanity';
import { SharedService } from '../../home/shared/shared.service';
import { Numbers } from '../../home/shared/shared';
import { AppState } from '../../state/state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { User } from '../../state/user/user.model';
import { Sum } from '../../state/sum/sum.model';

@Component({
  selector: 'price-list',
  // tslint:disable-next-line:use-host-property-decorator
  host: {
      '(document:mousedown)': 'onClick($event)',
  },
  template: `
    <div class="row" *ngIf="sum$ | async as sum">
    <hr>
        <div class="col-xs-6 col-sm-7 col-sm-offset-1">
            <h1>Price-list</h1>
            <div class="">
                <span *ngIf="!usedit" (click)="setUs()">USD $ {{ sum?.usd | number:'1.2-2'}}
                <i class="fa fa-pencil-square-o" aria-hidden="true" (click)="setUs()"></i> | </span>
                <span *ngIf="!woedit" (click)="setWo()">Walnut and Oak {{ sum?.WalnutOak | percent}}
                <i class="fa fa-pencil-square-o" aria-hidden="true" (click)="setWo()"></i> | </span>
                <span *ngIf="!tmedit" (click)="setTm()">Textured Melamine {{ sum?.TM | percent}}
                <i class="fa fa-pencil-square-o" aria-hidden="true" (click)="setTm()"></i> | </span>
                <span *ngIf="!euedit" (click)="setEu()">Euro {{ sum?.euro | percent}}
                <i class="fa fa-pencil-square-o" aria-hidden="true" (click)="setEu()"></i> | </span>
                <span *ngIf="!ncedit" (click)="setNc()">NC Discount {{ sum?.ncDiscount | percent}}
                <i class="fa fa-pencil-square-o" aria-hidden="true" (click)="setNc()"></i></span>
                <div>
                    <span *ngIf="!usedit; else usEdit" ></span>
                    <span *ngIf="!woedit; else woEdit" ></span>
                    <span *ngIf="!tmedit; else tmEdit" ></span>
                    <span *ngIf="!euedit; else euEdit" ></span>
                    <span *ngIf="!ncedit; else ncEdit" ></span>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
      <div class="col-md-10 col-md-offset-1">
        <ul class="nav nav-tabs">
            <li class="active"><a data-toggle="tab" href="#home">Canadian prices</a></li>
            <li><a data-toggle="tab" href="#menu1">USA prices</a></li>
            <li><a data-toggle="tab" href="#menu2">NC DL Discount Canadian</a></li>
            <li><a data-toggle="tab" href="#menu3">NC DL Discount USA</a></li>
        </ul>

        <div class="tab-content">
            <div id="home" class="tab-pane fade in active">
                <body-pricelist *ngFor="let vanity of vanities | async" [vanity]="vanity"></body-pricelist>
            </div>
            <div id="menu1" class="tab-pane fade">
                <price-skew *ngFor="let vanity of vanities | async" [vanity]="vanity"></price-skew>
            </div>
            <div id="menu2" class="tab-pane fade">
                <dis-can-price *ngFor="let vanity of vanities | async" [vanity]="vanity"></dis-can-price>
            </div>
            <div id="menu3" class="tab-pane fade">
                <dis-usa-price *ngFor="let vanity of vanities | async" [vanity]="vanity"></dis-usa-price>
            </div>
        </div>
      </div>

    <ng-template #usEdit>
        <form class="form-group">
            <input #usEdit name="text" (keyup.enter)="updateUs(usEdit.value)" class="form-control" [(ngModel)]="sum.usd" type="text"/>
        </form>
    </ng-template>

    <ng-template #woEdit>
        <form class="form-group">
            <input #woEdit name="text" (keyup.enter)="updateWo(woEdit.value)" class="form-control"
            [(ngModel)]="sum.WalnutOak" type="text"/>
        </form>
    </ng-template>

    <ng-template #tmEdit>
        <form class="form-group">
            <input #tmEdit name="text" (keyup.enter)="updateTm(tmEdit.value)" class="form-control" [(ngModel)]="sum.TM" type="text"/>
        </form>
    </ng-template>

    <ng-template #euEdit>
        <form class="form-group">
            <input #euEdit name="text" (keyup.enter)="updateEu(euEdit.value)" class="form-control" [(ngModel)]="sum.euro" type="text"/>
        </form>
    </ng-template>

    <ng-template #ncEdit>
        <form class="form-group">
            <input #discEdit name="text" (keyup.enter)="updateNc(discEdit.value)" class="form-control" 
            [(ngModel)]="sum.ncDiscount" type="text"/>
        </form>
    </ng-template>
</div>
  `,
  styles: [`
   .fa {
        display: none;
    }

    span:hover .fa {
        display: inline;
    }
  `]
})
export class PricelistComponent implements OnInit {

  vanities: FirebaseListObservable<Vanity[]>;
  user$: Observable<User>;
  sum$: Observable<Sum>;
  toggle: boolean;
  usedit: boolean;
  woedit: boolean;
  tmedit: boolean;
  euedit: boolean;
  ncedit: boolean;

  constructor(
      private route: ActivatedRoute,
      private vanitySvc: VanityService,
      private store: Store<AppState>,
      private _eref: ElementRef,
      private shared: SharedService
      ) {
        this.user$ = this.store.select(state => state.user);
        this.sum$ = this.store.select(state => state.sum);
    }

  ngOnInit() {
    this.vanities = this.vanitySvc.getItemsList({limitToLast: 5});
  }

  updateUs (value) {
    let key = 'usd';
    this.shared.updateNumbers(key, value);
    return this.usedit = null;
  }

  updateWo (value) {
    let key = 'WalnutOak';
    this.shared.updateNumbers(key, value);
    return this.woedit = null;
  }

  updateTm (value) {
    let key = 'TM';
    this.shared.updateNumbers(key, value);
    return this.tmedit = null;
  }

  updateNc (value) {
    let key = 'ncDiscount';
    this.shared.updateNumbers(key, value);
    return this.ncedit = null;
  }

  updateEu (value) {
    let key = 'euro';
    this.shared.updateNumbers(key, value);
    return this.euedit = null;
  }

  setUs() {
      return this.usedit = true;
  }

  setWo() {
      return this.woedit = true;
  }

  setTm() {
      return this.tmedit = true;
  }

  setEu() {
      return this.euedit = true;
  }

  setNc() {
      return this.ncedit = true;
  }

  onClick(event) {
      if (!this._eref.nativeElement.contains(event.target)) {
        this.usedit = null;
        this.woedit = null;
        this.tmedit = null;
        this.euedit = null;
        this.ncedit = null;
        this.toggle = null;
      }
  }
}
