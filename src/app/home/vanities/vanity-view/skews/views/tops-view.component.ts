import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import * as _ from 'lodash';
// tslint:disable-next-line:import-blacklist
import * as Rx from 'rxjs';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

import { Item } from '../../../../shared/shared';
import { Top } from '../../../../../dashboard/tops/shared/top';
import { ModsService } from '../mods/mods.service';
import { SharedService } from '../../../../shared/shared.service';
import { ToastService } from '../../../../shared/toast.service';
import { Counter2 } from '../../../../../state/config/sku.model';
import * as SkuActions from '../../../../../state/config/sku.actions';
import { AppState } from '../../../../../state/state';
import { Sink } from '../../../../../dashboard/sinks/shared/sink';

@Component({
  selector: 'top-view',
  template: `
  <div class=""><a (click)='openModal()'>
    <div class="thumbnail">
      <img class="access" src="{{ top?.images?.mainImg.url || '#none'}}" >
      <div class="caption">
        <h3>{{ top?.title}}</h3>
      </div>
    </div>
    <hr>
    <div class="thumbnail">
    <sink-view class="center" [sink]='sink | async'></sink-view>
    <div class="caption">
        <h3>{{ top?.sink}}</h3>
      </div>
    </div></a>
  </div>

  <div *ngIf="modalCounter" class="modal">
    <div class="jumbotron notification">
      <button class="delete" (click)="closeModal()"></button>
      <form [formGroup]="optionForm" (ngSubmit)="addTop(optionForm.value)" class="form-group">
        <div class="faucet">
          <div class="heading">
            <h2>Faucet options:</h2>
          </div>
          <div class="size">
            <label>Faucet drillings per sink:</label><br>
            <select formControlName="drilling">
              <option *ngFor="let drilling of drillings" [value]="drilling">{{ drilling }}</option>
            </select><br>
          </div>
          <div class="spread">
            <label>Size drilling:</label><br>
            <select formControlName="size">
              <option *ngFor="let size of sizes" [value]="size">{{ size }}</option>
            </select>
          </div>
          <div class="dril">
            <label>Spread of drillings:</label><br>
            <select formControlName="spread">
              <option *ngFor="let size of spread" [value]="size">{{ size }}</option>
            </select>
          </div>
          <div class="button"><br>
            <button class="btn btn-success" type="submit">add</button>
          </div>
        </div>
      </form>
    </div>
  </div>
  `,
  styleUrls: ['../order/order.component.css']
})

export class TopViewComponent implements OnInit {
  @Input()  itemTop: Item;
  sink: FirebaseObjectObservable<Sink>;
  top: Top;
  topSink: string;
  counter2: Counter2;
  optionForm: FormGroup;
  modalCounter: boolean;
  sizes = ['1 3/8"', '1 1/2"', '2"', '2 1/2"', '3"'];
  drillings = ['1', '2', '3'];
  spread = ['none', '4"', '6"', '8"'];
  counter: string;

  constructor(
      private route: ActivatedRoute,
      private db: AngularFireDatabase,
      private mods: ModsService,
      private itemSrv: SharedService,
      private toast: ToastService,
      private store: Store<AppState>,
      public fb: FormBuilder
      ) {
        this.optionForm = this.fb.group({
          size: ['1 3/8"', Validators.required],
          drilling: ['1'],
          spread: ['none']
        });
      }

  ngOnInit() {
     this.itemSrv.getTop(this.itemTop.$key).subscribe( top => {
       this.top = top;
       this.sink = this.itemSrv.getSink(top.sink);
      });
      this.mods.currentCounter.subscribe(counter => this.counter = counter);
      this.mods.changePage('false');
  }

  addTop(value) {
    let content = 'You have succesfully added ' + this.itemTop.$key + ' to your order.';
    let style = 'success';
    this.toast.sendMessage(content, style);
    let content2 = 'You have succesfully added ' + this.top.sink + ' to your order.';
    let style2 = 'success';
    this.toast.sendMessage(content2, style2);
    this.sink.take(1).subscribe( sink => {
      this.counter2 = {
        sink: this.top.sink,
        imageSink: sink.images['mainImg'].url,
        sku: this.top.title,
        cost: _.toNumber(this.top.price),
        urlSketch: this.top.images['mainImg'].url,
        drilling: value.drilling,
        size: value.size,
        spread: value.spread
      };
      this.store.dispatch(new SkuActions.AddCounter(this.counter2));
    }
  );
    this.modalCounter = false;
    this.mods.changeCounter('true');
  }

    openModal() {
        this.modalCounter = true;
    }

    closeModal() {
      this.modalCounter = false;
    }

}
