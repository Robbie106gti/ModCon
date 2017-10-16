import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';
import { User, Zone } from './zone';

@Injectable()
export class ZoneService {

  private baseItem = 'users';
  users: FirebaseListObservable<User[]> = null; //  list of objects
  user: FirebaseObjectObservable<User> = null; //   single object
  zones: FirebaseListObservable<Zone[]> = null; //  list of objects

  constructor(private db: AngularFireDatabase) { }

  // Return an observable list with optional query
  // You will usually call this from OnInit in a component
  getItemsList(): FirebaseListObservable<User[]> {
      this.users = this.db.list(this.baseItem);
    return this.users;
  }
  getNewList(): FirebaseListObservable<User[]> {
    this.users = this.db.list(this.baseItem, {
            query: {
                orderByChild: 'zone',
                equalTo: 'new'
            }
        });
    return this.users;
  }
  // Return an observable list with optional query
  // You will usually call this from OnInit in a component
  getZonesList(): FirebaseListObservable<Zone[]> {
      this.zones = this.db.list(`zones`);
    return this.zones;
  }

  // Return a single observable item
  getItem(key: string): FirebaseObjectObservable<User> {
    const matPath =  `/${this.baseItem}/${key}`;
    console.log(matPath);
    this.user = this.db.object(matPath);
    return this.user;
  }

  // Return a single item
  findMatByTitle(title): FirebaseListObservable<User[]> {
        this.users = this.db.list(this.baseItem, {
            query: {
                orderByChild: 'title',
                equalTo: title
            }
        });
    return this.users;
  }

  // Create item or Update an exisiting item
  updateZone(key: string, value: any): void {
    this.users.update(key, value)
      .catch(error => this.handleError(error));
  }

  // Create item or Update an exisiting item
  updateZonesUser(key: string, value: any) {
    const zoneFalse = {[key]: false};
    const valZone = value.zone;
    if (valZone !== 'admin') { this.db.object(`zones/admin/${key}`).remove(); }
    if (valZone !== 'nickel') { this.db.object(`zones/nickel/${key}`).remove(); }
    if (valZone !== 'orderDesk') { this.db.object(`zones/orderDesk/${key}`).remove(); }
    if (valZone !== 'dealer') { this.db.object(`zones/dealer/${key}`).remove(); }
    if (valZone !== 'new') { this.db.object(`zones/new/${key}`).remove(); }
    let path = `zones/${valZone}`;
    let zone = {[key]: true};
    this.db.object(path).update(zone)
      .catch(error => console.log(error));
  }

  // Deletes a single item
  deleteZone(key: string): void {
      this.users.remove(key)
        .catch(error => this.handleError(error));
  }

  // Default error handling for all actions
  private handleError(error) {
    console.log(error);
  }

}
