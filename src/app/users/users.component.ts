import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from './shared/zone';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userAuth: Observable<firebase.User>;

  constructor(
      public auth: AuthService,
      public afAuth: AngularFireAuth
    ) {
      this.userAuth = afAuth.authState;
  }

  ngOnInit() {
  }

}
