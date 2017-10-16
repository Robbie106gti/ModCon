import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from 'app/dashboard/dashboard.component';
import { VanitiesListComponent } from 'app/dashboard/vanities/vanities-list/vanities-list.component';
import { VanityFormComponent } from 'app/dashboard/vanities/vanity-form/vanity-form.component';
import { VanityDetailComponent } from 'app/dashboard/vanities/vanity-detail/vanity-detail.component';
import { VanityEditComponent } from 'app/dashboard/vanities/vanity-detail/vanity-edit/vanity-edit.component';
import { SkewFormComponent } from 'app/dashboard/vanities/vanity-detail/vanity-edit/skew-form/skew-form.component';
import { SkewsListComponent } from 'app/dashboard/vanities/vanity-detail/vanity-edit/skew-list/skew-list.component';
import { MaterialsComponent } from 'app/dashboard/materials/materials.component';
import { MaterialFormComponent } from 'app/dashboard/materials/material-form.component';
import { MaterialDetailComponent } from 'app/dashboard/materials/material-detail.component';
import { MaterialEditComponent } from 'app/dashboard/materials/edit/material-edit.component';
import { CountersComponent } from 'app/dashboard/counters/counter.component';
import { ConfigsComponent } from 'app/dashboard/configs/configs.component';
import { AccessComponent } from 'app/dashboard/access/access.component';
import { PantriesComponent } from 'app/dashboard/pantries/pantries.component';
import { TopsComponent } from 'app/dashboard/tops/tops.component';
import { SinksComponent } from 'app/dashboard/sinks/sinks.component';
import { AuthGuard } from 'app/users/auth/auth.guard';
import { UserComponent } from 'app/users/user/user.component';
import { UsersComponent } from 'app/users/users.component';
import { UserEditComponent } from 'app/users/user/edit/user-edit.component';
import { ItemsListComponent } from 'app/items/items-list/items-list.component';
import { ItemFormComponent } from 'app/items/item-form/item-form.component';
import { ItemDetailComponent } from 'app/items/item-detail/item-detail.component';

export const DashboardRoutes: Routes = [
  { path: 'dashboard',
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
    // { path: 'counter/:id', component: CounterEditComponent },
    { path: 'configurations', component: ConfigsComponent },
    // { path: 'configuration/:id', component: ConfigEditComponent },
    { path: 'accessories', component: AccessComponent },
    // { path: 'accessory/:id', component: AccessEditComponent },
    { path: 'pantries', component: PantriesComponent },
    // { path: 'pantry/:id', component: PantryEditComponent },
    { path: 'counter-tops', component: TopsComponent },
    // { path: 'counter-top/:id', component: TopEditComponent },
    { path: 'items', component: ItemsListComponent },
    { path: 'sinks', component: SinksComponent }
    // { path: 'sink/:id', component: SinkEditComponent },
    ]
  }
];
