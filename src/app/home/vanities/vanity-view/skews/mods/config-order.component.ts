import { Component, OnInit } from '@angular/core';
import { ModsService } from './mods.service';
import { AngularFireDatabase } from 'angularfire2/database';
import * as _ from 'lodash';

@Component({
  selector: 'config-order',
  template: `
  <span class="badge"><a [routerLink]="['../']"><i class="fa fa-arrow-circle-left" aria-hidden="true"></i> Back</a></span>
  <span class="badge"><small>0</small> configuration</span>
  <hr>
  <div class="wrapper">
  </div>
  `,
  styleUrls: ['./counter-order.component.css']
})
export class ConfigOrderComponent implements OnInit {
  page: string;

  constructor(
    private db: AngularFireDatabase,
    private mods: ModsService
  ) { }

  ngOnInit() {
    this.mods.currentPage.subscribe(page => this.page = page);
    this.mods.changePage('configuration');
  }

}
