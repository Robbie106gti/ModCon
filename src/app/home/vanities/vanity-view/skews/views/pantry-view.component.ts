import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AngularFireDatabase,
  FirebaseListObservable,
  FirebaseObjectObservable
} from 'angularfire2/database';
import * as _ from 'lodash';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';

import { Item } from '../../../../shared/shared';
import { ModsService } from '../mods/mods.service';
import { SharedService } from '../../../../shared/shared.service';
import { ToastService } from '../../../../shared/toast.service';
import { Pantry2 } from '../../../../../state/config/sku.model';
import * as SkuActions from '../../../../../state/config/sku.actions';
import { AppState } from '../../../../../state/state';

@Component({
  selector: 'pantry-view',
  template: `
  <div class="col-sm-6 col-md-4 col-xs-12 col-lg-3">
    <div class="thumbnail"><a (click)="openModal()">
      <img class="access" src="{{ pantry?.images?.mainImg.url || '#none'}}" >
      <div class="caption">
        <h3>{{ pantry?.title}}</h3>
      </div></a>
    </div>
  </div>


<div *ngIf="modalPantry" class="modal">
  <div class="jumbotron notification">
  <button class="delete" (click)="closeModal()"></button>
  <form [formGroup]="optionForm" (ngSubmit)="addPantry(optionForm.value)" class="form-group">

  <div class="faucet">
    <div class="heading">
      <h2>Pantry options:</h2>
    </div>
    <div class="size">
      <div class="btn-group btn-group-justified max" role="group" aria-label="...">
        <div class="btn-group" role="group">
          <button type="button" (click)="less()" class="btn btn-success"><span class="glyphicon glyphicon-minus"></span></button>
        </div>
        <div class="btn-group center" role="group">
          <span>{{ qnt }}</span>
        </div>
        <div class="btn-group" role="group">
          <button type="button" (click)="add()" class="btn btn-success"><span class="glyphicon glyphicon-plus"></span></button>
        </div>
      </div>
    </div>

      <div class="spread">
        <div>
          <label>Hinged:</label>
          <select formControlName="hinged">
            <option *ngFor="let location of hinged" [value]="location">{{location}}</option>
          </select>
        </div>
      </div>

      <div class="button">
        <button class="btn btn-success" type="submit">add</button>
      </div>
    </div>
    </form>
  </div>
</div>
  `,
  styleUrls: ['../order/order.component.css']
})
export class PantryViewComponent implements OnInit {
  id: any;
  title: string;
  @Input()
  itemPantry: Item;
  optionForm: FormGroup;
  pantry: any;
  spantry: Pantry2;
  modalPantry: boolean;
  qnt: number;
  hinged = ['left', 'right', '1 left & 1 right'];

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
      quantity: [1, Validators.required],
      hinged: ['left']
    });
    this.qnt = 1;
  }

  ngOnInit() {
    this.itemSrv
      .getPantry(this.itemPantry.$key)
      .subscribe(pantry => (this.pantry = pantry));
  }
  addPantry(value) {
    // console.log(value);
    let content =
      'You have succesfully added ' + this.itemPantry.$key + ' to your order.';
    let style = 'success';
    this.toast.sendMessage(content, style);
    let cal = this.qnt * this.pantry.price;
    this.spantry = {
      sku: this.pantry.title,
      cost: _.toNumber(this.pantry.price),
      quantity: this.qnt,
      total: cal,
      urlSketch: this.pantry.images['mainImg'].url,
      hinged: value.hinged
    };
    this.store.dispatch(new SkuActions.AddPantry(this.spantry));
    this.modalPantry = false;
  }

  add() {
    if (this.qnt === 2) {
      return;
    } else {
      this.qnt++;
    }
  }

  less() {
    if (this.qnt === 0) {
      return;
    } else {
      this.qnt--;
    }
  }

  openModal() {
    this.modalPantry = true;
  }

  closeModal() {
    this.modalPantry = false;
  }
}
