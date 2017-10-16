import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AuthService } from '../../users/auth/auth.service';

@Component({
  selector: 'orders-view',
  template: `
    <current-order-view></current-order-view>
    <past-orders></past-orders>
  `
})
export class OrdersComponent implements OnInit {

  constructor(
    private auth: AuthService
      ) { }

  ngOnInit() {
  }
}
