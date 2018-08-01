import { Component, OnInit } from '@angular/core';
import { Sink } from '../../dashboard/sinks/shared/sink';
import { SinksService } from '../../dashboard/sinks/shared/sink.service';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'sinks',
  template: `
<div class="row">
  <hr>
  <div class="col-xs-6 col-sm-7 col-sm-offset-">
    <h1>Sinks</h1>
  </div>
  <sink-form class="col-xs-6 col-sm-3"></sink-form>
</div>
<div class="row">
  <div *ngFor="let sink of sinks | async">
    <sink-detail [sink]='sink'></sink-detail>
  </div>
</div>
  `
})
export class SinksComponent implements OnInit {
  sinks: FirebaseListObservable<Sink[]>;

  constructor(private sinkSvc: SinksService) {}

  ngOnInit() {
    this.sinks = this.sinkSvc.getItemsList();
    // this.vanities.subscribe(() => this.showSpinner = false);
  }
}
