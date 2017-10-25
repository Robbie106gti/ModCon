import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as _ from 'lodash';

import { Item } from '../../../../shared/shared';
import { Access, Option } from '../../../../../dashboard/access/shared/access';
import { ModsService } from '../mods/mods.service';
import { SharedService } from '../../../../shared/shared.service';
import { ToastService } from '../../../../shared/toast.service';
import { AppState } from '../../../../../state/state';
import { Store } from '@ngrx/store';
import { Accessory } from '../../../../../state/config/sku.model';
import * as SkuActions from '../../../../../state/config/sku.actions';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'access-view',
  template: `
  <div *ngIf="access | async as a" class="glass">
  <form [formGroup]="optionForm" (ngSubmit)="addAcc(optionForm.value)" class="form-group">
    <div class="v-wrap" *ngIf="a?.title !== 'Medicine Cabinet'; else med">
        <div class="image">
          <img class="access" src="{{ a.images?.mainImg.url || '#none'}}" >
        </div>
        <div class="caption">
        <h3>{{ a?.title}}</h3>
          <label>Options:</label><br>
          <select [formControl]="optionForm.get('option')" [(ngModel)]="option">
            <option *ngFor="let option of options | async" [ngValue]="option">{{option.title}}</option>
          </select>
          <div>
            <label>Quantity:</label>
            <select formControlName="quantity">
              <option *ngFor="let quantity of quantities" [value]="quantity">{{quantity}}</option>
            </select>
          </div>
          <div>
            <label>Hinged/Location:</label>
            <select formControlName="location">
              <option *ngFor="let location of locations" [value]="location">{{location}}</option>
            </select>
          </div>
          <hr>
          <div class="button">
            <button class="btn btn-sm btn-success right" [disabled]="optionForm.controls['option'].pristine" type="submit">add</button>
          </div>
        </div>
    </div>
    <ng-template #med>
      <div class="image" (click)="modal()">
        <img class="access" src="{{ a.images?.mainImg.url || '#none'}}" >
      </div>
      <div class="caption" (click)="modal()">
        <h3>{{ a?.title}}</h3>
        <label>Options:</label><br>
        <select [formControl]="optionForm.get('option')" [(ngModel)]="option">
          <option *ngFor="let option of options | async" [ngValue]="option">{{option.title}}</option>
        </select>
        <div>
          <label>Quantity:</label>
          <select formControlName="quantity">
            <option *ngFor="let quantity of quantities" [value]="quantity">{{quantity}}</option>
          </select>
        </div>
        <div>
          <label>Hinged/Location:</label>
          <select formControlName="location">
            <option *ngFor="let location of locations" [value]="location">{{location}}</option>
          </select>
        </div>
        <hr>
      </div>
      <div class="button">
        <button class="btn btn-sm btn-success right" [disabled]="optionForm.controls['option'].pristine" type="submit">add</button>
      </div>

      <div *ngIf="medModal" class="modal">
        <div class="jumbotron jumbotronMed notification">
          <button class="delete" (click)="modalClose()"></button>
          <div class="medWrap">
            <div class="medContent">
              <div class="image">
                <img class="access" src="{{ a.images?.mainImg.url || '#none'}}" >
              </div>
              <div class="caption">
                <h3>{{ a?.title}}</h3>
                <label>Options:</label><br>
                <select [formControl]="optionForm.get('option')" [(ngModel)]="option">
                  <option *ngFor="let option of options | async" [ngValue]="option">{{option.title}}</option>
                </select>
                <div>
                  <label>Quantity:</label>
                  <select formControlName="quantity">
                    <option *ngFor="let quantity of quantities" [value]="quantity">{{quantity}}</option>
                  </select>
                </div>
                <div>
                  <label>Hinged/Location:</label>
                  <select formControlName="location">
                    <option *ngFor="let location of locations" [value]="location">{{location}}</option>
                  </select>
                </div>
                <hr>
              </div>
              <div class="button">
                <button class="btn btn-sm btn-success right" [disabled]="optionForm.controls['option'].pristine" type="submit">add</button>
              </div>
            </div>
            <div class="medColors">
              <color-medicine *ngFor="let option of options | async" [option]="option"></color-medicine>
            </div>
          </div>
        </div>
      </div>
    </ng-template>
    </form>
  </div>
  `,
  styleUrls: ['../order/order.component.css']
})

export class AccessViewComponent implements OnInit {
  id: any;
  title: string;
  optionForm: FormGroup;
  quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  locations = ['left', 'right', '1 left & 1 right', 'center'];

  @Input()  itemAccess: Item;
  access: FirebaseObjectObservable<Access>;
  options: FirebaseListObservable<Option[]>;
  option: any;
  access2: Access;
  accessories$: Observable<Accessory[]>;
  obj: Accessory;
  obj2: Accessory[];
  medModal: boolean = false;

  constructor(
      private route: ActivatedRoute,
      private db: AngularFireDatabase,
      private mods: ModsService,
      private itemSrv: SharedService,
      private toast: ToastService,
      private store: Store<AppState>,
      public fb: FormBuilder
      ) {
      this.title = this.route.snapshot.params.id;
      this.optionForm = this.fb.group({
        option: [{}, Validators.required],
        quantity: [1, Validators.required],
        size: [null],
        location: ['left']
      });
      this.accessories$ = this.store.select(state => state.sku.accessories);

      this.option = this.optionForm.controls['option'];
}

  ngOnInit() {
     this.access = this.itemSrv.getAcces(this.itemAccess.$key);
     this.options = this.itemSrv.getOptions(this.itemAccess.$key);
     this.access.subscribe(access => this.access2 = access );
     this.accessories$.subscribe( newAccess => this.obj2 = newAccess);
  }

  addAcc(value) {
    let content = 'You have successfully added ' + this.itemAccess.$key + ' to your order.';
    let style = 'success';
    value['url'] = this.imageMain(this.access2);
    this.toast.sendMessage(content, style);
    let newTotal = value.option.price * value.quantity;
    let nr = 0;
    if (this.obj2 === null) {
      nr = 0;
    } else {
      nr = this.obj2.length;
    }
    this.obj = {
      sku: this.access2.title,
      option: value.option.title,
      url: value.url,
      location: value.location,
      cost: value.option.price,
      quantity: value.quantity,
      total: newTotal,
    };
    this.obj2[nr] = this.obj;
    this.store.dispatch(new SkuActions.AddAccessory(this.obj2));
  }

  imageMain (access) {
    let images = access.images.mainImg.url;
    return images;
  }

  modal() {
    this.medModal = true;
  }

  modalClose() {
    this.medModal = false;
  }

}
