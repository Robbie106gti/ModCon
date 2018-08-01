import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Counter, Images } from './counter';
import { Upload } from '../../../uploads/shared/upload';

@Injectable()
export class CounterService {
  private basePath = 'uploads';
  private baseItem = 'counters';

  private uploadTask: firebase.storage.UploadTask;
  uploads: FirebaseListObservable<Upload[]>;
  counters: FirebaseListObservable<Counter[]> = null; //  list of objects
  counter: FirebaseObjectObservable<Counter> = null; //   single object
  snapshot: any;
  title: string;

  constructor(private db: AngularFireDatabase) {}

  // Return an observable list with optional query
  // You will usually call this from OnInit in a component
  getItemsList(query = {}): FirebaseListObservable<Counter[]> {
    this.counters = this.db.list(this.baseItem, {
      query: {
        orderByChild: 'title'
      }
    });
    return this.counters;
  }

  // Return a single observable item
  getItem(key: string): FirebaseObjectObservable<Counter> {
    const matPath = `/${this.baseItem}/${key}`;
    console.log(matPath);
    this.counter = this.db.object(matPath);
    return this.counter;
  }

  // Return a single item
  findMatByTitle(title): FirebaseListObservable<Counter[]> {
    this.counters = this.db.list(this.baseItem, {
      query: {
        orderByChild: 'title',
        equalTo: title
      }
    });
    return this.counters;
  }

  // Create item or Update an exisiting item
  updateItem(key: string, value: any): void {
    this.counters.update(key, value).catch(error => this.handleError(error));
  }

  // Deletes a single item
  deleteItem(key: string): void {
    this.counters.remove(key).catch(error => this.handleError(error));
  }

  updateCounterAv(key: string, title: string): void {
    const path = `counters/${key}/vanities`;
    const path2 = `vanities/${title}/counters`;
    const value = { [title]: true };
    const value2 = { [key]: true };
    this.db
      .object(path)
      .update(value)
      .catch(error => console.log(error));
    this.db
      .object(path2)
      .update(value2)
      .catch(error => console.log(error));
  }

  delCounterAv(key: string, title: string): void {
    const path = `counters/${key}/vanities/${title}`;
    const path2 = `vanities/${title}/counters/${key}`;
    this.db
      .object(path)
      .remove()
      .catch(error => console.log(error));
    this.db
      .object(path2)
      .remove()
      .catch(error => console.log(error));
  }

  // Executes the file uploading to firebase https://firebase.google.com/docs/storage/web/upload-files
  pushUploadMainImg(key: string, images: Images) {
    // console.log(key);
    // console.log(images);
    const storageRef = firebase.storage().ref();
    this.uploadTask = storageRef.child(`${this.basePath}/${this.baseItem}/${images.file.name}`).put(images.file);

    this.uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      snapshot => {
        // upload in progress
        images.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      error => {
        // upload failed
        console.log(error);
      },
      () => {
        // upload success
        images.url = this.uploadTask.snapshot.downloadURL;
        images.name = images.file.name;
        this.saveFileData(key, images);
      }
    );
  }

  // Writes the file details to the realtime db
  private saveFileData(key: string, images: Images) {
    const id = 'mainImg';
    this.db.list(`${this.baseItem}/${key}/images`).update(id, images);
  }

  // Writes the file details to the realtime db
  private deleteFileData(key: string) {
    return this.db.list(`${this.basePath}/${this.baseItem}/`).remove(key);
  }

  // Firebase files must have unique names in their respective storage dir
  // So the name serves as a unique key
  private deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${this.baseItem}/${name}`).delete();
  }

  // Default error handling for all actions
  private handleError(error) {
    console.log(error);
  }
}
