import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MessageComponent } from './shared/message.component';
import { NewMessageComponent } from '../users/user/new-message.component';
import { DashboardRoutingModule } from './routing/dashboard-routing.module';
import { CurrencyMaskModule } from 'ng2-currency-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    CurrencyMaskModule
  ],
  providers: [ ],
  declarations: []
})
export class DashboardModule { }
