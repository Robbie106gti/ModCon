import { Component, OnInit } from '@angular/core';
import { MessagingService } from '../../../users/shared/messaging.service';
import { AppState } from '../../../state/state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { User } from '../../../state/user/user.model';
import { NewMessage } from '../message';

@Component({
  selector: 'create-message',
  templateUrl: './create-message.component.html',
  styleUrls: ['./create-message.component.css']
})
export class CreateMessageComponent implements OnInit {
  message;
  toUsers: any;
  user$: Observable<User>;
  fromUser: User;
  toUser: any;
  textValue = '';

  constructor(
    private store: Store<AppState>,
    private msgService: MessagingService
  ) {}

  ngOnInit() {
    this.user$ = this.store.select(state => state.user);
    this.toUsers = this.msgService.getToUsers();
  }

  sendMessage(value) {
    this.user$.take(1).subscribe(user => {
      this.fromUser = user;
      let mes = {
        message: value,
        to: this.toUser.name,
        toUID: this.toUser.$key,
        from: this.fromUser.displayName,
        fromUID: this.fromUser.uid,
        read: false
      };
      this.msgService.sendMessage(mes);
      // console.log(mes);
      this.textValue = '';
    });
  }
}
