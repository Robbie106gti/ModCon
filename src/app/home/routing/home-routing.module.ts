import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { VanitiesComponent } from '../vanities/vanities.component';
import { AuthGuard } from '../../users/auth/auth.guard';
import { VanityListViewComponent } from '../vanities/vanity-view/vanities-list.component';
import { SkewComponent } from '../vanities/vanity-view/skews/skew.component';
import { SkewOrderComponent } from '../vanities/vanity-view/skews/skew-order.component';
import { OptionsOrderComponent } from '../vanities/vanity-view/skews/mods/options-order.component';
import { CounterOrderComponent } from '../vanities/vanity-view/skews/mods/counter-order.component';
import { ColorOrderComponent } from '../vanities/vanity-view/skews/mods/color-order.component';
import { AccessOrderComponent } from '../vanities/vanity-view/skews/mods/access-order.component';
import { PantryOrderComponent } from '../vanities/vanity-view/skews/mods/pantry-order.component';
import { ModsOrderComponent } from '../vanities/vanity-view/skews/mods/mods-order.component';
import { VanityViewComponent } from '../vanities/vanity-view/vanity-view.component';
import { SkewViewComponent } from '../vanities/vanity-view/skews/skew-view.component';
import { AccessViewComponent } from '../vanities/vanity-view/skews/views/access-view.component';
import { CounterViewComponent } from '../vanities/vanity-view/skews/views/counters-view.component';
import { PantryViewComponent } from '../vanities/vanity-view/skews/views/pantry-view.component';
import { MatViewComponent } from '../vanities/vanity-view/skews/views/mat-view.component';
import { ColorViewComponent } from '../vanities/vanity-view/skews/views/color-view.component';
import { TopViewComponent } from '../vanities/vanity-view/skews/views/tops-view.component';
import { SinkViewComponent } from '../vanities/vanity-view/skews/views/sinks-view.component';
import { ValueModsComponent } from '../vanities/vanity-view/skews/mods/value-mods.component';
import { UserOrderComponent } from '../vanities/vanity-view/skews/order/user-order.component';
import { OrderItemComponent } from '../vanities/vanity-view/skews/order/order-item.component';
import { OrderItemSubComponent } from '../vanities/vanity-view/skews/order/order-itemsub.component';
import { OrderTotalsComponent } from '../vanities/vanity-view/skews/order/order-totals.component';
import { DemoComponent } from '../demo/demo.component';

const routes: Routes = [
  {
  path: 'vanities',
  component: VanitiesComponent,
  canActivate: [AuthGuard],
  children: [
    { path: '', component: VanityListViewComponent },
    { path: ':id', component: SkewComponent },
    {
      path: ':id/:id',
      component: SkewOrderComponent,
      children: [
        { path: 'options', component: OptionsOrderComponent },
        { path: 'options/counters', component: CounterOrderComponent },
        { path: 'options/colors', component: ColorOrderComponent },
        { path: 'options/accessories', component: AccessOrderComponent },
        { path: 'options/pantries', component: PantryOrderComponent }
      ]
    }
    ]
  },
  { path: 'order/:id', component: UserOrderComponent },
  { path: 'demo/:id', component: DemoComponent },
  { path: 'demo/:id/:id', component: DemoComponent }
];

@NgModule({
  imports: [
   CommonModule,
   FormsModule,
   ReactiveFormsModule,
   RouterModule.forChild(routes)
  ],
  declarations: [
    VanitiesComponent,
    SkewComponent,
    SkewOrderComponent,
    VanityListViewComponent,
    ColorOrderComponent,
    CounterOrderComponent,
    OptionsOrderComponent,
    AccessOrderComponent,
    PantryOrderComponent,
    ModsOrderComponent,
    VanityViewComponent,
    SkewViewComponent,
    AccessViewComponent,
    CounterViewComponent,
    PantryViewComponent,
    MatViewComponent,
    ColorViewComponent,
    TopViewComponent,
    SinkViewComponent,
    ValueModsComponent,
    UserOrderComponent,
    OrderItemComponent,
    OrderItemSubComponent,
    OrderTotalsComponent,
    DemoComponent
  ],
  providers: []
})
export class HomeRoutingModule { }
