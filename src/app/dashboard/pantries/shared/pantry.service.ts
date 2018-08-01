import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Pantry, Vanities, Images } from './pantry';
import { Upload } from '../../../uploads/shared/upload';

@Injectable()
export class PantriesService {
  private basePath = 'uploads';
  private baseItem = 'pantries';

  private uploadTask: firebase.storage.UploadTask;
  uploads: FirebaseListObservable<Upload[]>;
  pantries: FirebaseListObservable<Pantry[]> = null; //  list of objects
  pantry: FirebaseObjectObservable<Pantry[]> = null; //   single object
  vanitries: FirebaseObjectObservable<Vanities> = null; //   single object
  snapshot: any;
  title: string;

  constructor(private db: AngularFireDatabase) {}

  // Return an observable list with optional query
  // You will usually call this from OnInit in a component
  getItemsList(query = {}): FirebaseListObservable<Pantry[]> {
    this.pantries = this.db.list(this.baseItem, {
      query: {}
    });
    return this.pantries;
  }

  // Return a single observable item
  getItem(key: string): FirebaseObjectObservable<Pantry[]> {
    const matPath = `/${this.baseItem}/${key}`;
    console.log(matPath);
    this.pantry = this.db.object(matPath);
    return this.pantry;
  }

  // Return a single item
  findMatByTitle(title): FirebaseListObservable<Pantry[]> {
    this.pantries = this.db.list(this.baseItem, {
      query: {
        orderByChild: 'title',
        equalTo: title
      }
    });
    return this.pantries;
  }

  // Create item or Update an exisiting item
  updateItem(key: string, value: any): void {
    this.pantries.update(key, value).catch(error => this.handleError(error));
  }

  // Update an exisiting item
  updatePantry(key: string, title: string): void {
    const path = `pantries/${key}/vanities`;
    const path2 = `vanities/${title}/pantries`;
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

  // Update an exisiting item
  delPantry(key: string, title: string): void {
    const path = `pantries/${key}/vanities/${title}`;
    this.db
      .object(path)
      .remove()
      .catch(error => console.log(error));
    const path2 = `vanities/${title}/pantries/${key}`;
    this.db
      .object(path2)
      .remove()
      .catch(error => console.log(error));
  }

  // Deletes a single item
  deleteItem(key: string): void {
    this.pantries.remove(key).catch(error => this.handleError(error));
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
