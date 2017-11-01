import { RouterModule, Routes } from '@angular/router';
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
    { path: 'configurations', component: ConfigsComponent },
    { path: 'accessories', component: AccessComponent },
    { path: 'pantries', component: PantriesComponent },
    { path: 'counter-tops', component: TopsComponent },
    { path: 'items', component: ItemsListComponent },
    { path: 'sinks', component: SinksComponent }
    ]
  }
];
