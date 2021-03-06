import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Observable } from 'rxjs';
import { ModsService } from '../../home/vanities/vanity-view/skews/mods/mods.service';
import { User } from '../../state/user/user.model';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { OrderItem } from '../../home/vanities/vanity-view/skews/order/orderItem';
import { UserFacade } from '../../state/user/user.facade';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user$: Observable<User> = this.userService.user$;
  message: string;
  order: AngularFireList<OrderItem[]>;
  qtyOrder: number = 0;
  // tslint:disable-next-line:max-line-length
  facebookImg =
    'https://firebasestorage.googleapis.com/v0/b/modcon-2b3c7.appspot.com/o/assets%2Fsocial%2Ffacebook.svg?alt=media&token=1780dfde-6a4f-4ef7-a0d2-eed57f91762f';
  googleImg =
    'https://firebasestorage.googleapis.com/v0/b/modcon-2b3c7.appspot.com/o/assets%2Fsocial%2Fgoogle.svg?alt=media&token=6aef65c9-c3f5-4071-a242-3bdff3b0d184';
  // tslint:disable-next-line:max-line-length
  twitterImg =
    'https://firebasestorage.googleapis.com/v0/b/modcon-2b3c7.appspot.com/o/assets%2Fsocial%2Ftwitter.svg?alt=media&token=aca76009-32bd-4759-8e65-615327d79887';

  constructor(
    public auth: AuthService,
    private db: AngularFireDatabase,
    public flashMessage: FlashMessagesService,
    private router: Router,
    private mods: ModsService,
    private userService: UserFacade
  ) {
    this.user$.subscribe(user => {
      if (user.loading === false) {
        this.order = this.db.list(`orders/orderItems/${user.orderId}/items`);
        this.order.valueChanges().subscribe(order => {
          this.qtyOrder = order.length;
          this.db.object(`users/${user.uid}/numbers`).update({ orderqty: this.qtyOrder });
        });
      }
    });
  }

  changeCurrency(value) {
    this.mods.updateCurrency(value);
  }

  signInWithGoogle(): void {
    this.auth.googleLogin().then(() => this.afterSignIn());
  }

  signInWithFacebook(): void {
    this.auth.facebookLogin().then(() => this.afterSignIn());
  }

  signInWithTwitter(): void {
    this.auth.twitterLogin().then(() => this.afterSignIn());
  }

  /// Shared
  private afterSignIn(): void {
    // Do after login stuff here, such router redirects, toast messages, etc.
    // console.log(this.auth.currentUserId);
    this.router
      .navigate(['/home/vanities'])
      // tslint:disable-next-line:max-line-length
      .then(() =>
        this.flashMessage.show('You are now logged in with ' + this.auth.provider, {
          cssClass: 'alert-success',
          timeout: 3000
        })
      );
  }

  login() {
    this.userService.login();
    this.router
      .navigate(['/home/vanities'])
      // tslint:disable-next-line:max-line-length
      .then(() =>
        this.flashMessage.show('You are now logged in with ' + this.auth.provider, {
          cssClass: 'alert-success',
          timeout: 3000
        })
      );
  }
  logout() {
    this.userService.logout();
    this.router
      .navigateByUrl('')
      .then(() => this.flashMessage.show('You are now logged out', { cssClass: 'alert-success', timeout: 3000 }));
  }
}
