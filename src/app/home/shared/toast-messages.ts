import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../../users/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database/firebase_list_observable';
import { ToastService } from './toast.service';
import { Notification } from './message';

@Component({
  selector: 'toast-messages',
  template: `
  <div class="wrapper">
    <aside *ngFor="let message of messages | async | reverse">
      <toast-message [message]="message"></toast-message>
    </aside>
  </div>
  `,
  styleUrls: ['./toast.messages.css']
})
export class ToastMessagesComponent implements OnInit {
  messages: FirebaseListObservable<Notification[]> = null;
  constructor(private toast: ToastService, private afAuth: AngularFireAuth) { }
  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.messages = this.toast.getMessages(); }
    });
  }
}
