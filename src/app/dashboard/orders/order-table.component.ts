import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { User } from '../../users/shared/zone';
import { AuthService } from '../../users/auth/auth.service';

@Component({
  selector: 'order-table',
  template: `
        <td>Maine - MA26</td>
        <td>Paint</td>
        <td>Black</td>
        <td>SI26</td>
        <td>Concrete</td>
        <td>MA20-TP</td>
        <td>1</td>
        <td>$ 4,005.25</td>
  `,
  styleUrls: ['../../home/vanities/vanity-view/skews/order/order.component.css']
})
export class OrderTableComponent implements OnInit {
    user: User;
    @Input() item: any;

  constructor(
    private auth: AuthService
      ) { }

  ngOnInit() {
    this.auth.curUser.subscribe(user => this.user = user);
   // this.vanities.subscribe(() => this.showSpinner = false);
  }
}
