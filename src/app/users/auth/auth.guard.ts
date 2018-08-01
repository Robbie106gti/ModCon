import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { tap, map, take } from 'rxjs/operators';
import { FlashMessagesService } from 'angular2-flash-messages/module';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router, public flashMessage: FlashMessagesService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (this.auth.authenticated) {
      return true;
    }

    return this.auth.currentUserObservable.pipe(
      take(1),
      map(user => !!user),
      tap(loggedIn => {
        if (!loggedIn) {
          // console.log('access denied');
          this.router.navigate(['']);
          this.flashMessage.show('Please login', { cssClass: 'alert-warning', timeout: 3000 });
        }
      })
    );
  }
}
