import { Component, OnInit } from '@angular/core';
import { ModsService } from './mods.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as _ from 'lodash';
import { SharedService } from '../../../../shared/shared.service';
import { Configuration } from '../../../../../dashboard/configs/shared/configuration';

@Component({
  selector: 'config-order',
  template: `
  <span class="badge"><a [routerLink]="['../']"><i class="fa fa-arrow-circle-left" aria-hidden="true"></i> Back</a></span>
  <span class="badge"><small>0</small> configuration</span>
  <hr>
  <div class="wrapper">
    <config-view class="thumbnail" *ngFor="let config of configs | async" [config]="config"></config-view>
  </div>
  `,
  styleUrls: ['./counter-order.component.css']
})
export class ConfigOrderComponent implements OnInit {
  page: string;
  configs: FirebaseListObservable<Configuration[]>;

  constructor(
    private db: AngularFireDatabase,
    private itemSvc: SharedService,
    private mods: ModsService
  ) { }

  ngOnInit() {
    this.configs = this.itemSvc.getConfigs();
    this.mods.currentPage.subscribe(page => this.page = page);
    this.mods.changePage('configuration');
  }

}
