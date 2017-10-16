import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Rx';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { User } from '../shared/zone';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/state';
import * as UserActions from '../../state/user/user.actions';

@Injectable()
export class AuthService {

  authState: any = null;
 // user: FirebaseObjectObservable<User> = null; //   single object
  private user: BehaviorSubject<User> = new BehaviorSubject(null);
  curUser = this.user.asObservable();
  isProvider;
  zone;
  order: any;
/*  private zone = new BehaviorSubject<string>('No UID');
  currentZone = this.zone.asObservable();*/

  constructor(
      public afAuth: AngularFireAuth,
      private db: AngularFireDatabase,
      private router: Router,
      private store: Store<AppState>
      ) {
            this.afAuth.authState.subscribe((auth) => {
              this.authState = auth;
            });
          }

// Returns true if user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }

  // Returns current user data
  get currentUser(): any {
    return this.authenticated ? this.authState : null;
  }

  // Returns
  get currentUserObservable(): any {
    return this.afAuth.authState;
  }

  // Returns current user UID
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  // Anonymous User
  get currentUserAnonymous(): boolean {
    return this.authenticated ? this.authState.isAnonymous : false;
  }

  // Returns current user display name or Guest
  get currentUserDisplayName(): string {
    if (!this.authState) { return 'Guest';
      } else if (this.currentUserAnonymous) { return 'Anonymous';
      } else { return this.authState['displayName'] || 'User without a Name'; }
  }

  // Returns provider if user is logged in
  get provider(): string {
    return this.afAuth.auth.currentUser.providerData[0].providerId;
  }

  get currentZoneAdmin(): boolean {
    const uid = this.currentUserId;
    if (uid) {
      const ref = `zones/admin/${uid}`;
      this.db.object(ref).subscribe((obj) => {
            return this.zone = obj.$exists();
       });
      // console.log(`admin: ` + this.zone);
       return this.zone;
    }
  }

  get currentZoneNickel(): boolean {
    const uid = this.currentUserId;
    if (uid) {
      const ref = `zones/nickel/${uid}`;
      this.db.object(ref).subscribe((obj) => {
            return this.zone = obj.$exists();
       });
      // console.log(`nickel: ` + this.zone);
       return this.zone;
    }
  }

  get currentZoneOrderDesk(): boolean {
    const uid = this.currentUserId;
    if (uid) {
      const ref = `zones/orderDesk/${uid}`;
      this.db.object(ref).subscribe((obj) => {
            return this.zone = obj.$exists();
       });
      // console.log(`orderDesk: ` + this.zone);
       return this.zone;
    }
  }

  get currentZoneDealer(): boolean {
    const uid = this.currentUserId;
    if (uid) {
      const ref = `zones/dealer/${uid}`;
      this.db.object(ref).subscribe((obj) => {
            return this.zone = obj.$exists();
       });
      // console.log(`dealer: ` + this.zone);
       return this.zone;
    }
  }

  get currentZoneNew(): boolean {
      const uid = this.currentUserId;
      if (uid) {
        const ref = `zones/new/${uid}`;
        this.db.object(ref).subscribe((obj) => {
            return this.zone = obj.$exists();
        });
       // console.log(`new: ` + this.zone);
        return this.zone;
      }
    }

 //// Social Auth ////

  githubLogin() {
    const provider = new firebase.auth.GithubAuthProvider();
    return this.socialSignIn(provider);
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.socialSignIn(provider);
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.socialSignIn(provider);
  }

  twitterLogin() {
    const provider = new firebase.auth.TwitterAuthProvider();
    return this.socialSignIn(provider);
  }

  private socialSignIn(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) =>  {
          this.authState = credential.user;
          this.updateUserData();
      })
      .catch(error => console.log(error));
  }


  //// Anonymous Auth ////

  anonymousLogin() {
    return this.afAuth.auth.signInAnonymously()
    .then((user) => {
      this.authState = user;
      this.updateUserData();
    })
    .catch(error => console.log(error));
  }

  //// Email/Password Auth ////

  emailSignUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        this.updateUserData();
      })
      .catch(error => console.log(error));
  }

  emailLogin(email: string, password: string) {
     return this.afAuth.auth.signInWithEmailAndPassword(email, password)
       .then((user) => {
         this.authState = user;
         this.updateUserData();
       })
       .catch(error => console.log(error));
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    const auth = firebase.auth();

    return auth.sendPasswordResetEmail(email)
      .then(() => console.log('email sent'))
      .catch((error) => console.log(error));
  }


  //// Sign Out ////

  signOut(): void {
    this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }


  //// Helpers ////

  private updateUserData(): void {
  // Writes user name and email to realtime db
  // useful if your app displays information about users or for admin features
    const uid = this.currentUserId;
    const path = `users/${uid}`; // Endpoint on firebase
    const ref = `users/${uid}/zone`;
    const data = {
                  email: this.authState.email,
                  name: this.authState.displayName,
                  lastLogin: firebase.database.ServerValue.TIMESTAMP,
                  provider: this.afAuth.auth.currentUser.providerData['0'].providerId
                };
    const dataNew = { [uid]: true };
      if (uid) {
       this.db.object(ref).subscribe((obj) => {
        // console.log(obj.$exists());
        this.store.dispatch(new UserActions.GetUser());
        if (obj.$exists()) {
            // object exists
            this.db.object(path).update(data)
             .catch(error => console.log(error));
            return;
          } else {
          // object does not exist
            let value = Object.assign({zone: 'new'}, data);
            this.db.object(path).update(value)
             .catch(error => console.log(error));
            this.db.object(`zones/new/`).update(dataNew)
             .catch(error => console.log(error));
            return;
          }
      });
    }
  }
}
