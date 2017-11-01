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
import { Color } from '../../../../../dashboard/materials/shared/material';
import { Configuration } from '../../../../../dashboard/configs/shared/configuration';

@Component({
  selector: 'config-view',
  template: `
  <div *ngIf="config as a" class="glass">
  <form [formGroup]="optionForm" (ngSubmit)="addAcc(optionForm.value)" class="form-group">
    <div class="v-wrap" *ngIf="a?.title !== 'Medicine Cabinet'; else med">
        <div class="image">
          <img class="access" src="{{ a.images?.mainImg.url || '#none'}}" >
        </div>
        <div class="caption">
        <h3>{{ a.title }}</h3>
          <hr>
          <div class="button">
            <button class="btn btn-sm btn-success right" [disabled]="optionForm.controls['option'].pristine" type="submit">add</button>
          </div>
        </div>
    </div>
    <ng-template #med>
    <div class="alert">
      <div class="image" (click)="modal()">
        <img class="access" src="{{ a.images?.mainImg.url || '#none'}}" >
      </div>
      <div class="caption" (click)="modal()">
        <h3>{{ a?.title}}</h3>
        <hr>
      </div>
      <div class="button">
      </div>
      </div>
      <div *ngIf="medModal" class="modal epad">
        <div class="jumbotron jumbotronMed notification">
          <button class="delete" (click)="modalClose()"></button>
          <div class="medWrap">
            <div class="medContent">
              <div class="medCon">
                <div class="image">
                  <img class="access" src="{{ a.images?.mainImg.url || '#none'}}" >
                </div>
                <div class="caption">
                  <h3>{{ a?.title }}</h3>
                  <label>Option: </label><span> {{ optionForm.value.option?.title }} - {{ optionForm.value.color?.title }}</span>
                  <hr>
                </div>
                <div class="button">
                  <button class="btn btn-sm btn-success right" [disabled]="!optionForm.value.option.title" type="submit">add</button>
                </div>
              </div>
            </div>
            <div class="medColors">
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

export class ConfigViewComponent implements OnInit {
  @Input() config: Configuration;
  optionForm: FormGroup;
  medModal: boolean = false;
  option: any;
  accessories$: any;

  constructor(
      private db: AngularFireDatabase,
      private mods: ModsService,
      private toast: ToastService,
      private store: Store<AppState>,
      public fb: FormBuilder
      ) {
      this.optionForm = this.fb.group({
        option: [{}, Validators.required],
        quantity: [1, Validators.required],
        size: [null],
        location: ['left'],
        color: [null]
      });
      this.accessories$ = this.store.select(state => state.sku.accessories);
      this.option = this.optionForm.controls['option'];
}

  ngOnInit() {
  }

  addAcc(value) {
      this.store.dispatch(new SkuActions.AddAccessory(value));
      this.modalClose();
  }

  modal() {
    this.medModal = true;
  }

  modalClose() {
    this.medModal = false;
  }

}
