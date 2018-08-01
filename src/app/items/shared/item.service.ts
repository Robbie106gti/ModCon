import { Injectable } from '@angular/core';
// import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from "angularfire2";
import {
  AngularFireDatabaseModule,
  AngularFireDatabase,
  FirebaseListObservable,
  FirebaseObjectObservable
} from 'angularfire2/database-deprecated';
import { Item } from './item';

@Injectable()
export class ItemService {
  private basePath: string = '/items';

  items: FirebaseListObservable<Item[]> = null; //  list of objects
  item: FirebaseObjectObservable<Item> = null; //   single object

  constructor(private db: AngularFireDatabase) {}

  // Return an observable list with optional query
  // You will usually call this from OnInit in a component
  getItemsList(query = {}): FirebaseListObservable<Item[]> {
    this.items = this.db.list('/items', {
      query: query
    });
    return this.items;
  }

  // Return a single observable item
  getItem(key: string): FirebaseObjectObservable<Item> {
    const itemPath = `${this.basePath}/${key}`;
    this.item = this.db.object(itemPath);
    return this.item;
  }

  // Create a bramd new item
  createItem(item: Item): void {
    this.items.push(item);
  }

  // Update an exisiting item
  updateItem(key: string, value: any): void {
    this.items.update(key, value).catch(error => this.handleError(error));
  }

  // Deletes a single item
  deleteItem(key: string): void {
    this.items.remove(key).catch(error => this.handleError(error));
  }

  // Deletes the entire list of items
  deleteAll(): void {
    this.items.remove().catch(error => this.handleError(error));
  }

  // Default error handling for all actions
  private handleError(error) {
    console.log(error);
  }
}
