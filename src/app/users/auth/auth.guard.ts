import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { FlashMessagesService } from 'angular2-flash-messages/module';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    public flashMessage: FlashMessagesService
    ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
      if (this.auth.authenticated) { return true; }

      return this.auth.currentUserObservable
           .take(1)
           .map(user => !!user)
           .do(loggedIn => {
             if (!loggedIn) {
              // console.log('access denied');
               this.router.navigate(['']);
               this.flashMessage.show('Please login', {cssClass: 'alert-warning', timeout: 3000});
             }
         });
  }
}
