import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Notification } from './message';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../state/state';
import { User } from '../../state/user/user.model';

@Injectable()
export class ToastService {
  messages: FirebaseListObservable<Notification[]> = null;
  user$: Observable<User>;
  user: User;

  constructor(
    private db: AngularFireDatabase,
    private store: Store<AppState>
  ) {
    this.user$ = this.store.select(state => state.user);
    this.user$.subscribe( user => this.user = user);
  }

  sendMessage(content, style) {
    let message = new Notification(content, style);
    this.db.list(`notifications/${this.user.uid}`).push(message);
  }

  dismissMessage(messageKey) {
    this.db.object(`notifications/${this.user.uid}/${messageKey}`).update({'dismissed': true});
  }

  getMessages(): FirebaseListObservable<Notification[]> {
    this.messages = this.db.list(`notifications/${this.user.uid}`, {
      query: {
        limitToLast: 10
      }
    });
    return this.messages;
  }
}


