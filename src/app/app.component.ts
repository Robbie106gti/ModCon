import { Component, OnInit } from '@angular/core';
import { AuthService } from './users/auth/auth.service';
import { FirebaseObjectObservable } from 'angularfire2/database';
import { MessagingService } from './users/shared/messaging.service';

@Component({
  selector: 'app-root',
  template: `
<header></header>
  <div class="container-fluid">
    <loading-spinner></loading-spinner>
    <flash-messages></flash-messages>
    <toast-messages></toast-messages>
    <router-outlet></router-outlet>
  </div>
<footer></footer>
  `
})
export class AppComponent implements OnInit {
  title: string;
  
  constructor(
      private authSrv: AuthService,
      private msgService: MessagingService
      ) { }

  ngOnInit() {
    this.msgService.getPermission();
    document.body.style.backgroundColor = '#fff';
    document.getElementById('loader').style.display = 'none';
  }
}
