import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Favorite } from './favorites';

@Injectable()
export class FavoritesService {
  favorites: FirebaseListObservable<Favorite[]>;

  constructor(
    private db: AngularFireDatabase
  ) { }

  getFavorites(uid): FirebaseListObservable<Favorite[]> {
    this.favorites = this.db.list(`favorites/${uid}`);
    return this.favorites;
  }

}
