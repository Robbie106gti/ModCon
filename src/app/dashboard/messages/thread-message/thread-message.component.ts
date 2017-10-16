import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../state/user/user.model';
import { Message, Thread } from '../message';

@Component({
  selector: 'thread-message',
  template: `
  <div *ngIf="thread">
    <div *ngFor="let m of onGoingThread | async">
      <div class="alert from fade in" *ngIf="m.fromUID !== user.uid; else you">
        <span class="time-l">{{ m.timestamp | date: 'short' }} - {{ m.from }}</span>
        <p>{{ m.message }}</p>
      <div class="left"></div>
    </div>

    <ng-template #you>
      <div class="alert you fade in">
        <span class="time-r">{{ m.timestamp | date: 'short' }} - {{ m.from }}</span>
        <p>{{ m.message }}</p>
        <div class="right"></div>
      </div>
    </ng-template>

  </div>
  `,
  styles: [`
  .left {
    position: relative;
    float: left;
    left: -1.6rem;
    bottom: 1.3rem;
    padding-top: 0.5rem;
    vertical-align: bottom;
    border-bottom: 10px solid rgb(190, 208, 236);
    border-left: 10px solid transparent;
    line-height: 1rem;
  }
  .right {
    position: relative;
    float: right;
    right: -1.6rem;
    bottom: 1.3rem;
    padding-top: 0.5rem;
    vertical-align: bottom;
    border-bottom: 10px solid rgb(226, 226, 226);
    border-right: 10px solid transparent;
    line-height: 1rem;
  }
  .from {
    text-align: left;
    background-color: rgb(190, 208, 236);
  }
  .you {
    text-align: right;
    background-color: rgb(226, 226, 226);
  }
  .user {
    max-width: 2rem;
  }
  .time-l {
    position: relative;
    font-size: .8rem;
    color: rgb(112, 112, 112);
    vertical-align: top;
    line-height: .5rem;
    width: 100%;
    text-align: right;
    float: right;
  }
  .time-r {
    position: relative;
    font-size: .8rem;
    color: rgb(112, 112, 112);
    vertical-align: top;
    line-height: .5rem;
    width: 100%;
    text-align: left;
    float: left;
  }
  .alert {
    padding: .5rem;
    margin-bottom: .8rem;
  }
  alert p {
    margin-top: .8rem;
  }
  `]
})
export class ThreadMessageComponent {
  @Input() thread: Message;
  @Input() user: User;
  @Input() onGoingThread: Thread[];

  constructor() {  }

}
