import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AppState } from '../../state/state';
import { Store } from '@ngrx/store';
import { User } from '../../state/user/user.model';
import { MessagingService } from '../../users/shared/messaging.service';
import { Message } from '../../dashboard/messages/message';
import { Favorite } from '../../dashboard/favorites/favorites';
import { FavoritesService } from '../../dashboard/favorites/favorites.service';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterUiComponent implements OnInit {
  user$: Observable<User>;
  user: User;
  messages: FirebaseListObservable<Message[]>;
  replied: FirebaseListObservable<Message[]>;
  favorites: FirebaseListObservable<Favorite[]>;
  users: FirebaseListObservable<any[]>;
  unread: number = 0;
  favorite: number = 0;
  replies: number = 0;
  newUsers: number = 0;

  constructor(
    private msgService: MessagingService,
    private fav: FavoritesService,
    private db: AngularFireDatabase,
    private store: Store<AppState>
    ) {
    this.user$ = this.store.select(state => state.user);
    this.user$.subscribe( user => {
      if (user.loading === false && !user.error) {
        this.messages = this.msgService.getMessagesUnread(user.uid);
        this.messages.subscribe( mes => {
          this.unread = mes.length;
          this.db.object(`users/${user.uid}/numbers`).update({ unread: this.unread });
        });
        this.favorites = this.fav.getFavorites(user.uid);
        this.favorites.subscribe( favo => {
          this.favorite = favo.length;
          this.db.object(`users/${user.uid}/numbers`).update({ favorites: this.favorite });
        });
        this.replied = this.msgService.getMessagesReplies(user.uid);
        this.replied.subscribe( re => {
          this.replies = re.length;
          this.db.object(`users/${user.uid}/numbers`).update({ replies: this.replies });
        });
      }
      this.users = this.db.list(`zones/new`);
      this.users.subscribe( re => {
        this.newUsers = re.length + -1;
      });
    });
  }

  ngOnInit() {
  }

}
