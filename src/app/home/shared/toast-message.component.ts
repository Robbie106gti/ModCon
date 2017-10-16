import { Component, OnInit, Input } from '@angular/core';
import { ToastService } from './toast.service';

@Component({
  selector: 'toast-message',
  template: `
    <div *ngIf="message" class="notification"
         [ngClass]="{'is-info':     message.style=='info',
                     'is-danger':   message.style=='danger',
                     'is-success':  message.style=='success'}">
      <button class="delete" (click)="dismiss(message.$key)"></button>
      {{message.content}}
    </div>
  `,
  styleUrls: ['./toast.messages.css'],
})
export class ToastMessageComponent implements OnInit {
  @Input() message: any;
  constructor(private toast: ToastService) { }
  ngOnInit() {
    setTimeout(() => {
        this.dismiss();
    }, 5000 );
  }
  dismiss() {
    this.toast.dismissMessage(this.message.$key);
  }
}
