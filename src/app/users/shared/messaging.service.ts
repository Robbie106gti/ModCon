import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

import { take, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Message, Thread } from '../../dashboard/messages/message';
import { AppState } from '../../state/state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../state/user/user.model';

@Injectable()
export class MessagingService {
  messaging = firebase.messaging();
  currentMessage = new BehaviorSubject(null);
  messages: FirebaseListObservable<Message[]>;
  thread: FirebaseListObservable<Thread[]>;
  user: any;
  ToUsers: any;
  user$: Observable<User>;
  fromUser: User;

  constructor(private db: AngularFireDatabase, private store: Store<AppState>, private afAuth: AngularFireAuth) {
    this.user$ = this.store.select(state => state.user);
    this.user$.subscribe(user => (this.fromUser = user));
  }

  updateToken(token) {
    this.afAuth.authState.pipe(
      take(1),
      map(user => {
        if (!user) {
          return;
        }
        const data = { [user.uid]: token };
        this.db.object('fcmTokens/').update(data);
        this.user = user;
        // console.log(user);
      })
    );
  }

  getPermission() {
    this.messaging
      .requestPermission()
      .then(() => {
        console.log('Notification permission granted.');
        return this.messaging.getToken();
      })
      .then(token => {
        console.log(token);
        this.updateToken(token);
      })
      .catch(err => {
        console.log('Unable to get permission to notify.', err);
      });
  }

  receiveMessage() {
    this.messaging.onMessage(payload => {
      console.log('Message received. ', payload);
      this.currentMessage.next(payload);
    });
  }

  sendMessage(mes) {
    mes['timestamp'] = firebase.database.ServerValue.TIMESTAMP;
    let message = new Message(mes);
    let receivedId = this.db.list(`messages/${mes.toUID}`).push(message);
    message['read'] = true;
    let sentId = this.db.list(`messages2/${mes.fromUID}/sent`).push(message);
    let thread: Thread = {
      read: false,
      message: mes.message,
      from: mes.from,
      fromUID: mes.fromUID,
      timestamp: mes.timestamp
    };
    let threadId = this.db.list(`threads/`).push({ timestamp: mes.timestamp });
    this.db.list(`threads/${threadId.key}/messages/`).push(thread);
    this.db
      .object(`messages2/${mes.fromUID}/sent/${sentId.key}`)
      .update({ receivedId: receivedId.key, threadId: threadId.key });
    this.db.object(`messages/${mes.toUID}/${receivedId.key}`).update({ sentId: sentId.key, threadId: threadId.key });
  }

  dismissMessage(messageKey, sender) {
    this.db.object(`messages/${this.user.uid}/${messageKey}`).update({ read: true });
    this.db.object(`messages2/${sender}/sent/${messageKey}`).update({ read: true });
  }

  getMessages(): FirebaseListObservable<Message[]> {
    this.messages = this.db.list(`messages/${this.user.uid}`, {
      query: {
        limitToLast: 10
      }
    });
    return this.messages;
  }

  getMessagesUnread(uid): FirebaseListObservable<Message[]> {
    let read = false;
    this.messages = this.db.list(`messages/${uid}`, {
      query: {
        orderByChild: 'read',
        equalTo: read
      }
    });
    return this.messages;
  }

  getMessagesReplies(uid): FirebaseListObservable<Message[]> {
    let read = false;
    this.messages = this.db.list(`messages2/${uid}/sent`, {
      query: {
        orderByChild: 'read',
        equalTo: read
      }
    });
    return this.messages;
  }

  getSentMessages(): FirebaseListObservable<Message[]> {
    this.messages = this.db.list(`messages2/${this.user.uid}/sent`, {
      query: {
        limitToLast: 10
      }
    });
    return this.messages;
  }

  getToUsers() {
    this.ToUsers = this.db.list(`users/`);
    return this.ToUsers;
  }

  getThread(key): FirebaseListObservable<Thread[]> {
    this.thread = this.db.list(`threads/${key}/messages`);
    return this.thread;
  }

  addToThread(key, thread) {
    thread['timestamp'] = firebase.database.ServerValue.TIMESTAMP;
    this.db.list(`threads/${key}/messages/`).push(thread);
  }

  updateReceived(key, forUID, value) {
    this.db.object(`messages/${forUID}/${key}`).update(value);
  }

  updateSent(key, forUID, value) {
    this.db.object(`messages2/${forUID}/sent/${key}`).update(value);
  }

  updateThread(key, messageId, value) {
    this.db.object(`threads/${key}/messages/${messageId}`).update(value);
  }
}
