import { ReversePipe2 } from '../../ui/reverse.pipe';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DashboardComponent } from '../dashboard.component';
import { AuthGuard } from '../../users/auth/auth.guard';
import { UserComponent } from '../../users/user/user.component';
import { UserEditComponent } from '../../users/user/edit/user-edit.component';
import { VanitiesListComponent } from '../vanities/vanities-list/vanities-list.component';
import { VanityEditComponent } from '../vanities/vanity-detail/vanity-edit/vanity-edit.component';
import { MaterialsComponent } from '../materials/materials.component';
import { MaterialEditComponent } from '../materials/edit/material-edit.component';
import { CountersComponent } from '../counters/counter.component';
import { ConfigsComponent } from '../configs/configs.component';
import { AccessComponent } from '../access/access.component';
import { PantriesComponent } from '../pantries/pantries.component';
import { TopsComponent } from '../tops/tops.component';
import { ItemsListComponent } from '../../items/items-list/items-list.component';
import { SinksComponent } from '../sinks/sinks.component';
import { CarouselEditComponent } from '../carousel/carousel-edit.component';
import { VanityFormComponent } from '../vanities/vanity-form/vanity-form.component';
import { VanityDetailComponent } from '../vanities/vanity-detail/vanity-detail.component';
import { SkewFormComponent } from '../vanities/vanity-detail/vanity-edit/skew-form/skew-form.component';
import { SkewsListComponent } from '../vanities/vanity-detail/vanity-edit/skew-list/skew-list.component';
import { SkewDetailComponent } from '../vanities/vanity-detail/vanity-edit/skew-list/skew-detail.component';
import { MaterialFormComponent } from '../materials/material-form.component';
import { MaterialDetailComponent } from '../materials/material-detail.component';
import { ColorComponent } from '../materials/edit/colors/colors.component';
import { ColorFormComponent } from '../materials/edit/colors/colors-form.component';
import { ColorDetailComponent } from '../materials/edit/colors/colors-details.component';
import { CounterFormComponent } from '../counters/counter-form.component';
import { CounterDetailComponent } from '../counters/counter-detail.component';
import { TopFormComponent } from '../tops/top-form.component';
import { TopDetailComponent } from '../tops/top-detail.component';
import { SinkDetailComponent } from '../sinks/sink-detail.component';
import { SinkFormComponent } from '../sinks/sink-form.component';
import { AccessDetailComponent } from '../access/access-detail.component';
import { AccessFormComponent } from '../access/access-form.component';
import { ConfigFormComponent } from '../configs/config-form.component';
import { ConfigDetailComponent } from '../configs/config-detail.component';
import { PantryDetailComponent } from '../pantries/pantry-detail.component';
import { PantryFormComponent } from '../pantries/pantry-form.component';
import { ItemFormComponent } from '../../items/item-form/item-form.component';
import { ItemDetailComponent } from '../../items/item-detail/item-detail.component';
import { UploadDetailComponent } from '../../uploads/upload-detail/upload-detail.component';
import { UploadFormComponent } from '../../uploads/upload-form/upload-form.component';
import { UploadsListComponent } from '../../uploads/uploads-list/uploads-list.component';
import { PantryEditComponent } from '../vanities/vanity-detail/vanity-edit/list-item/pantry-edit.component';
import { AccessEditComponent } from '../vanities/vanity-detail/vanity-edit/list-item/access-edit.component';
import { UsersComponent } from '../../users/users.component';
import { ColorEditComponent } from '../vanities/vanity-detail/vanity-edit/list-item/color-edit.component';
import { CounterEditComponent } from '../vanities/vanity-detail/vanity-edit/list-item/counter-edit.component';
import { TopEditComponent } from '../vanities/vanity-detail/vanity-edit/list-item/tops-edit.component';
import { SinkEditComponent } from '../vanities/vanity-detail/vanity-edit/list-item/sinks-edit.component';
import { FeaturetteEditComponent } from '../featurette/featurette-edit.component';
import { FeaturetteListComponent } from '../featurette/featurette-list.component';
import { FeaturettePointComponent } from '../featurette/featurette-point.component';
import { CarouselListComponent } from '../carousel/carousel-list.component';
import { ImageDDComponent } from '../shared/image-dropdown.component';
import { UploadDDComponent } from '../shared/upload-dropdown.component';
import { UsDollarComponent } from '../vanities/shared/us-cal.component';
import { PricelistComponent } from '../pricelist/pricelist.component';
import { BodyPricelistComponent } from '../pricelist/body-pricelist.component';
import { SkewPricelistComponent } from '../pricelist/price-skew.componet';
import { DisCanPriceComponent } from '../pricelist/dis-can-price.component';
import { DisUsaPriceComponent } from '../pricelist/dis-usa-price.component';
import { OptionAccessComponent } from '../access/options-access.component';
import { OrdersComponent } from '../orders/order.component';
import { CurrentOrderComponent } from '../orders/current-order.component';
import { PastOrderComponent } from '../orders/past-orders.component';
import { OrderItemViewComponent } from '../orders/order-item-view.component';
import { OrderTableComponent } from '../orders/order-table.component';
import { PastOrderViewComponent } from '../orders/past-order-view.component';
import { OrderDeskComponent } from '../orderdesk/orderdesk.component';
import { MessagesComponent } from '../messages/messages.component';
import { FavoritesComponent } from '../favorites/favorites.component';
import { MessageComponent } from '../shared/message.component';
import { NewMessageComponent } from '../../users/user/new-message.component';
import { CreateMessageComponent } from '../messages/create-message/create-message.component';
import { ReadMessageComponent } from '../messages/read-message/read-message.component';
import { HomeEditsComponent } from '../home/home.component';
import { UserPipe } from '../../users/user/user.pipe';
import { ThreadMessageComponent } from '../messages/thread-message/thread-message.component';
import { OptionsComponent } from '../options/options.component';
import { OptionDetailComponent } from '../options/option-detail.component';
import { OptionFormComponent } from '../options/option-form.component';
import { OptionEditComponent } from '../vanities/vanity-detail/vanity-edit/list-item/option-edit.component';
import { DefaultEditComponent } from '../vanities/vanity-detail/vanity-edit/list-item/default-edit.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: UserComponent },
      { path: 'user/:id', component: UserEditComponent },
      { path: 'vanities', component: VanitiesListComponent },
      { path: 'vanity/:id', component: VanityEditComponent },
      { path: 'materials', component: MaterialsComponent },
      { path: 'material/:id', component: MaterialEditComponent },
      { path: 'counters', component: CountersComponent },
      { path: 'home', component: HomeEditsComponent },
      { path: 'configurations', component: ConfigsComponent },
      { path: 'accessories', component: AccessComponent },
      { path: 'pantries', component: PantriesComponent },
      { path: 'counter-tops', component: TopsComponent },
      { path: 'items', component: ItemsListComponent },
      { path: 'pricelist', component: PricelistComponent },
      { path: 'options', component: OptionsComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'orderdesk', component: OrderDeskComponent },
      { path: 'sinks', component: SinksComponent },
      { path: 'messages', component: MessagesComponent },
      { path: 'favorites', component: FavoritesComponent }
    ]
  }
];

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes)],
  declarations: [
    VanitiesListComponent,
    CarouselEditComponent,
    DashboardComponent,
    VanityFormComponent,
    VanityDetailComponent,
    VanityEditComponent,
    SkewFormComponent,
    SkewsListComponent,
    SkewDetailComponent,
    MaterialsComponent,
    MaterialFormComponent,
    MaterialDetailComponent,
    MaterialEditComponent,
    ColorComponent,
    ColorFormComponent,
    ColorDetailComponent,
    CountersComponent,
    CounterFormComponent,
    CounterDetailComponent,
    TopsComponent,
    TopFormComponent,
    TopDetailComponent,
    SinksComponent,
    SinkDetailComponent,
    SinkFormComponent,
    AccessComponent,
    AccessDetailComponent,
    AccessFormComponent,
    ConfigsComponent,
    ConfigFormComponent,
    ConfigDetailComponent,
    PantriesComponent,
    PantryDetailComponent,
    PantryFormComponent,
    ItemsListComponent,
    ItemFormComponent,
    ItemDetailComponent,
    UploadDetailComponent,
    UploadFormComponent,
    UploadsListComponent,
    PantryEditComponent,
    AccessEditComponent,
    OptionAccessComponent,
    UsersComponent,
    UserComponent,
    UserEditComponent,
    ColorEditComponent,
    CounterEditComponent,
    TopEditComponent,
    SinkEditComponent,
    FeaturetteEditComponent,
    FeaturetteListComponent,
    FeaturettePointComponent,
    CarouselListComponent,
    ImageDDComponent,
    UsDollarComponent,
    UploadDDComponent,
    PricelistComponent,
    BodyPricelistComponent,
    SkewPricelistComponent,
    DisCanPriceComponent,
    DisUsaPriceComponent,
    OrdersComponent,
    CurrentOrderComponent,
    PastOrderComponent,
    OrderItemViewComponent,
    OrderTableComponent,
    PastOrderViewComponent,
    OrderDeskComponent,
    ReversePipe2,
    MessageComponent,
    NewMessageComponent,
    MessagesComponent,
    CreateMessageComponent,
    ReadMessageComponent,
    FavoritesComponent,
    HomeEditsComponent,
    UserPipe,
    ThreadMessageComponent,
    OptionsComponent,
    OptionDetailComponent,
    OptionFormComponent,
    DefaultEditComponent,
    OptionEditComponent
  ]
})
export class DashboardRoutingModule {}
