import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { User3 } from '../shared/zone';
import { ZoneService } from '../shared/zone.service';
import { AppState } from '../../state/state';
import { Store } from '@ngrx/store';
import { User } from '../../state/user/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user$: Observable<User>;

  users: FirebaseListObservable<User3[]>;
  usersNew: FirebaseListObservable<User3[]>;

  constructor(
      private zoneSrv: ZoneService,
      private store: Store<AppState>
    ) {
      this.user$ = this.store.select(state => state.user);
  }

  ngOnInit() {
    this.usersNew = this.zoneSrv.getNewList();
    this.users = this.zoneSrv.getItemsList();
  }

}
