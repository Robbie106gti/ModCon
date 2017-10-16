import { Component, OnInit } from '@angular/core';
import { Counter } from 'app/dashboard/counters/shared/counter';
import { CounterService } from 'app/dashboard/counters/shared/counter.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'counters',
  template: `
    <div class="row">  
    <hr>  
        <div class="col-xs-6 col-sm-7 col-sm-offset-">
            <h1>Counters</h1>    
        </div>
        <counter-form class="col-xs-6 col-sm-3"></counter-form>    
    </div>
    <div class="row">   
        <div *ngFor="let counter of counters | async">
            <counter-detail [counter]='counter'></counter-detail>
        </div>  
    </div>
  `
})
export class CountersComponent implements OnInit {
  counters: FirebaseListObservable<Counter[]>;

  constructor(
      private counterSvc: CounterService,
      private route: ActivatedRoute
      ) { }

  ngOnInit() {
    this.counters = this.counterSvc.getItemsList();
   // this.vanities.subscribe(() => this.showSpinner = false);
  }
}
