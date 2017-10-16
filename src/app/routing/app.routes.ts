// @ts-check
import { Routes, RouterModule } from '@angular/router';

///// Services
import { AuthGuard } from '../users/auth/auth.guard';
import { AuthService } from '../users/auth/auth.service';

import { AppComponent } from '../app.component';
import { NotFoundComponent } from '../not-found.component';

///// Components
import { HomeComponent } from '../home/home.component';
// import { ReadmePageComponent } from 'app/ui/readme-page/readme-page.component';

export const routes: Routes = [
  {
    path: 'vanities',
    loadChildren: 'app/home/home.module#HomeModule'
  },
  {
    path: 'dashboard',
    loadChildren: 'app/dashboard/dashboard.module#DashboardModule',
    canActivate: [AuthGuard]
  },
  { path: '', component: HomeComponent },
  { path: '**', component: NotFoundComponent }
];
