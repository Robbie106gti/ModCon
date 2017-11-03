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
  templateUrl: './config-view.component.html',
  styleUrls: ['../order/order.component.css']
})

export class ConfigViewComponent implements OnInit {
  @Input() config: Configuration;
  optionForm: FormGroup;
  modal = { value: 'none' };
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

  modalOpen(value) {
    this.modal.value = value.title;
  }

  modalClose() {
    this.modal.value = 'none';
  }

}
