import { Component, OnInit } from '@angular/core';
import { Pantry } from '../../dashboard/pantries/shared/pantry';
import { PantriesService } from '../../dashboard/pantries/shared/pantry.service';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'pantries',
  template: `
    <div class="row">
    <hr>
        <div class="col-xs-6 col-sm-7 col-sm-offset-">
            <h1>Pantries</h1>
        </div>
        <pantry-form class="col-xs-6 col-sm-3"></pantry-form>
    </div>
    <div class="row">
        <div *ngFor="let pantry of pantries | async">
            <pantry-detail [pantry]='pantry'></pantry-detail>
        </div>
    </div>
  `
})
export class PantriesComponent implements OnInit {
  pantries: FirebaseListObservable<Pantry[]>;

  constructor(private pantrySvc: PantriesService) {}

  ngOnInit() {
    this.pantries = this.pantrySvc.getItemsList();
    // this.vanities.subscribe(() => this.showSpinner = false);
  }
}
