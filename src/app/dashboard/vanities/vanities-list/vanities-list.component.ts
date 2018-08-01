import { Component, OnInit } from '@angular/core';
import { VanityService } from '../shared/vanity.service';
import { Vanity } from '../shared/vanity';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'vanities-list',
  templateUrl: './vanities-list.component.html'
})
export class VanitiesListComponent implements OnInit {
  vanities: FirebaseListObservable<Vanity[]>;

  showSpinner: boolean = true;

  constructor(private vanitySvc: VanityService) {}

  ngOnInit() {
    this.vanities = this.vanitySvc.getItemsList({ limitToLast: 5 });
    this.vanities.subscribe(() => (this.showSpinner = false));
  }

  deleteItems() {
    this.vanitySvc.deleteAll();
  }
}
