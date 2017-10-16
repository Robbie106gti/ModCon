import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './routing/home-routing.module';
import { DatepickerModule } from '../ui/datepicker/datepicker.module';
import { TooltipModule } from '../ui/tooltip/tooltip.module';
import { DatepickerDemoComponent } from './vanities/date-picker/datepicker-demo.component';
import { DemoService } from './demo/demo.service';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    DatepickerModule,
    TooltipModule
  ],
  declarations: [
    DatepickerDemoComponent
  ],
  providers: [
    DemoService
  ]
})
export class HomeModule { }
