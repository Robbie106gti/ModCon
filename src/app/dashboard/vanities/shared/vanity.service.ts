import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Vanity, Skews } from './vanity';

@Injectable()
export class VanityService {
  private basePath = '/vanities';

  vanities: FirebaseListObservable<Vanity[]> = null; //  list of objects
  vanity: FirebaseObjectObservable<Vanity[]> = null; //   single object
  skews: FirebaseListObservable<Skews[]> = null; //  list of objects
  skew: FirebaseObjectObservable<Skews> = null; //   single object
  snapshot: any;
  title: string;

  constructor(private db: AngularFireDatabase) {}

  // Return an observable list with optional query
  // You will usually call this from OnInit in a component
  getItemsList(query = {}): FirebaseListObservable<Vanity[]> {
    this.vanities = this.db.list('vanities', {
      query
    });
    return this.vanities;
  }

  getSkewsList(key: string, query = {}): FirebaseListObservable<Skews[]> {
    this.skews = this.db.list(`vanities/${key}/skews`, {
      query
    });
    return this.skews;
  }

  // Return a single observable item
  getItem(key: string): FirebaseObjectObservable<Vanity[]> {
    const vanityPath = `${this.basePath}/${key}`;
    this.vanity = this.db.object(vanityPath, { preserveSnapshot: true });
    /*    let snapshotVanity = this.db.object(`${this.basePath}/${key}`, { preserveSnapshot: true});
      snapshotVanity.subscribe(snapshot => {
          this.vanity = snapshot.val();
      });*/
    console.log(this.vanity);
    return this.vanity;
  }

  // Return a single item
  findVanityByTitle(title): FirebaseListObservable<Vanity[]> {
    this.vanities = this.db.list('vanities', {
      query: {
        orderByChild: 'title',
        equalTo: title
      }
    });
    return this.vanities;
  }

  // Create a bramd new item
  createItem(key: string, value: any): void {
    this.vanities.update(key, value).catch(error => this.handleError(error));
  }

  // Update an exisiting item
  updateItem(key: string, value: any): void {
    this.vanities.update(key, value).catch(error => this.handleError(error));
  }

  // Update an exisiting item
  updatePantry(key: string, value: any): void {
    // tslint:disable-next-line:prefer-const
    let path = `vanities/${key}/pantries`;
    this.db
      .object(path)
      .update(value)
      .catch(error => console.log(error));
  }

  // Update an exisiting item
  updateSkew(key: string, value: any): void {
    this.skews.update(key, value).catch(error => this.handleError(error));
  }

  // Deletes a single item
  deleteItem(key: string): void {
    this.vanities.remove(key).catch(error => this.handleError(error));
  }

  // Deletes a single item
  deleteSkew(key: string): void {
    this.skews.remove(key).catch(error => this.handleError(error));
  }

  // Deletes the entire list of items
  deleteAll(): void {
    this.vanities.remove().catch(error => this.handleError(error));
  }

  // Default error handling for all actions
  private handleError(error) {
    console.log(error);
  }
}
