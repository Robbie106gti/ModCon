import { NotFoundComponent } from '../not-found.component';
import { HomeComponent } from '../home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'home', loadChildren: '../home/home.module#HomeModule'},
  { path: 'dashboard', loadChildren: '../dashboard/dashboard.module#DashboardModule'},
  { path: '', component: HomeComponent },
  { path: '**', component: NotFoundComponent }
];


@NgModule({
  imports: [
    // Router
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
