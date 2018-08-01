import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'beta-message',
  template: `
<div class="col-md-12 alert alert-info notification">
  <button class="delete" (click)="dismissed()"></button>
  <div class="col-md-10 col-sm-10 col-xs-10">
    <h1>Hi, we are still in Beta!</h1>
    <p>Thank you for already checking out the Modcon Vanity WebApp, our dev guy is hard at work getting it ready for use. Please
      understand that for now it’s only a look up tool and no values and/or orders can be use/placed just jet.</p>
    <p>We hope that soon you can place your order here, so hold on tight, once it’s ready for use, there will be a newsletter
      and or a message in Webquoin notifying you that it’s ready.</p>
    <p>If you have any question and or see something wrong please email Rob at nickels cabinets .com</p>
  </div>
  <div class="col-md-2 col-sm-2 col-xs-2">
    <i class="fa fa-ticket fa-5x" aria-hidden="true"></i>
  </div>
  <br>
  <br>
</div>
  `,
  styleUrls: ['../../home/vanities/vanity-view/skews/order/order.component.css']
})
export class MessageComponent implements OnInit {
  alert: boolean = true;

  constructor() {}

  ngOnInit() {}
  dismissed() {
    this.alert = false;
  }
}
