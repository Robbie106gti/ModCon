import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './routing/dashboard-routing.module';
import { CurrencyMaskModule } from 'ng2-currency-mask';

@NgModule({
  imports: [CommonModule, FormsModule, DashboardRoutingModule, CurrencyMaskModule],
  providers: [],
  declarations: []
})
export class DashboardModule {}
