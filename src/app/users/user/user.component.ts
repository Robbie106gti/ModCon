import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { User } from '../shared/zone';
import { ZoneService } from '../shared/zone.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userAuth: Observable<firebase.User>;

  users: FirebaseListObservable<User[]>;
  usersNew: FirebaseListObservable<User[]>;

  constructor(
      public auth: AuthService,
      public afAuth: AngularFireAuth,
      private zoneSrv: ZoneService
    ) {
      this.userAuth = afAuth.authState;
  }

  ngOnInit() {
    this.usersNew = this.zoneSrv.getNewList();
    this.users = this.zoneSrv.getItemsList();
   // this.vanities.subscribe(() => this.showSpinner = false);
  }

}
