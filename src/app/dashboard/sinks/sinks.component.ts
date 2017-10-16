import { Component, OnInit } from '@angular/core';
import { Sink } from 'app/dashboard/sinks/shared/sink';
import { SinksService } from 'app/dashboard/sinks/shared/sink.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ActivatedRoute } from '@angular/router';

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

  constructor(
      private sinkSvc: SinksService,
      private route: ActivatedRoute
      ) { }

  ngOnInit() {
    this.sinks = this.sinkSvc.getItemsList();
   // this.vanities.subscribe(() => this.showSpinner = false);
  }
}
