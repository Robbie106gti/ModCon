import { Component, OnInit } from '@angular/core';
import { MessagingService } from '../../users/shared/messaging.service';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Message, Thread } from './message';
import { AuthService } from '../../users/auth/auth.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../state/state';
import { User, IUser } from '../../state/user/user.model';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  message;
  messages: FirebaseListObservable<Message[]>;
  sentMessages: FirebaseListObservable<Message[]>;
  onGoingThread: FirebaseListObservable<Thread[]>;
  user$: Observable<User>;
  user: User;
  showSpinner: boolean = true;
  textValue: string;
  newMessage: boolean = true;
  thread: Message = null;

  constructor(
    private msgService: MessagingService,
    private store: Store<AppState>,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.user$ = this.store.select(state => state.user);
    this.user$.subscribe( user => {
      this.user = user;
      if (user.loading === false) {
        this.messages = this.msgService.getMessages();
        this.sentMessages = this.msgService.getSentMessages();
      }
    } );
    this.msgService.receiveMessage();
    this.message = this.msgService.currentMessage;
  }

  sendMessage() {
    let thread: Thread = {
      read: false,
      message: this.textValue,
      from: this.user.displayName,
      fromUID: this.user.uid
    };
    this.msgService.addToThread(this.thread.threadId, thread);
    this.textValue = '';
    let value = {
      read: false
    };
    if (this.user.uid === this.thread.fromUID) {
      this.msgService.updateReceived(this.thread.receivedId, this.thread.toUID, value);
    }
    if (this.user.uid === this.thread.toUID) {
      this.msgService.updateSent(this.thread.sentId, this.thread.fromUID, value);
    }
  }

  openNew () {
    this.thread = null;
    this.newMessage = true;
  }

  threadOpenReceived (message) {
    let key = message.$key;
    this.thread = message;
    this.thread['receivedId'] = key;
    this.newMessage = false;
    let value = {
      read: true
    };
    this.msgService.updateReceived(key, this.thread.toUID, value);
    this.onGoingThread = this.msgService.getThread(this.thread.threadId);
  }

  threadOpenSent (message) {
    this.thread = null;
    let key = message.$key;
    this.thread = message;
    this.thread['sentId'] = key;
    this.newMessage = false;
    let forUID = this.thread.fromUID;
    let value = {
      read: true
    };
    this.msgService.updateSent(this.thread.sentId, forUID, value);
    this.onGoingThread = this.msgService.getThread(this.thread.threadId);
  }

}
