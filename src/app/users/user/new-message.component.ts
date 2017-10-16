import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'new-message',
  template: `
      <div class="col-md-6 col-lg-8 col-xs-10 col-xs-push-1 col-sm-10 col-sm-push-1 alert alert-success notification">
          <button class="delete" (click)="dismissed()"></button>
          <div class="col-md-10 col-sm-10 col-xs-10">
              <h1>Thank you for signing up, you’re currently a "NEW" user...</h1>
              <p>We will review and maybe get in touch with you, after which we will assign you the appropriate title.</p>
              <p>If we haven't assigned you to an appropriate title please send Rob at nickels cabinets .com an email, he is the developer on this project and still creating lots of new features for you to use.</p>
          </div>
          <div class="col-md-2 col-sm-2 col-xs-2">
              <i class="fa fa-ticket fa-5x" aria-hidden="true"></i>
          </div>
      </div>
  `,
  styleUrls: ['../../home/vanities/vanity-view/skews/order/order.component.css']
})
export class NewMessageComponent implements OnInit {
    alert: boolean = true;

  constructor() {  }

  ngOnInit() {
  }
  dismissed() {
    this.alert = false;
  }

}
