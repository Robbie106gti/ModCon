import { Component, OnInit } from '@angular/core';
import { MessagingService } from '../../../users/shared/messaging.service';
import { AppState } from '../../../state/state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../../state/user/user.model';
import { take, map } from 'rxjs/operators';

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

  private textValue = '';

  constructor(private store: Store<AppState>, private msgService: MessagingService) {}

  ngOnInit() {
    this.user$ = this.store.select(state => state.user);
    this.toUsers = this.msgService.getToUsers();
  }

  sendMessage(value) {
    this.user$.pipe(
      take(1),
      map(user => {
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
      })
    );
  }
}
