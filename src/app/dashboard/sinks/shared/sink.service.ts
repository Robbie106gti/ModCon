import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  FirebaseListObservable,
  FirebaseObjectObservable
} from 'angularfire2/database-deprecated';
import * as firebase from 'firebase';
import { Sink, Images } from './sink';
import { Upload } from '../../../uploads/shared/upload';

@Injectable()
export class SinksService {
  private basePath = 'uploads';
  private baseItem = 'sinks';

  private uploadTask: firebase.storage.UploadTask;
  uploads: FirebaseListObservable<Upload[]>;
  sinks: FirebaseListObservable<Sink[]> = null; //  list of objects
  sink: FirebaseObjectObservable<Sink> = null; //   single object
  snapshot: any;
  title: string;

  constructor(private db: AngularFireDatabase) {}

  // Return an observable list with optional query
  // You will usually call this from OnInit in a component
  getItemsList(query = {}): FirebaseListObservable<Sink[]> {
    this.sinks = this.db.list(this.baseItem, {
      query: {
        orderByChild: 'title'
      }
    });
    return this.sinks;
  }

  // Return a single observable item
  getItem(key: string): FirebaseObjectObservable<Sink> {
    const matPath = `/${this.baseItem}/${key}`;
    console.log(matPath);
    this.sink = this.db.object(matPath);
    return this.sink;
  }

  // Return a single item
  findMatByTitle(title): FirebaseListObservable<Sink[]> {
    this.sinks = this.db.list(this.baseItem, {
      query: {
        orderByChild: 'title',
        equalTo: title
      }
    });
    return this.sinks;
  }

  // Create item or Update an exisiting item
  updateItem(key: string, value: any): void {
    this.sinks.update(key, value).catch(error => this.handleError(error));
  }

  // Update an exisiting item
  updateSink(key: string, title: string): void {
    let path = `sinks/${key}/counter-tops`;
    let path2 = `counter-tops/${title}`;
    let value = { [title]: true };
    let value2 = { sink: key };
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
  delSink(key: string, title: string): void {
    let path = `sinks/${key}/counter-tops/${title}`;
    this.db
      .object(path)
      .remove()
      .catch(error => console.log(error));
    let path2 = `counter-tops/${title}/sinks/${key}`;
    this.db
      .object(path2)
      .remove()
      .catch(error => console.log(error));
  }

  // Deletes a single item
  deleteItem(key: string): void {
    this.sinks.remove(key).catch(error => this.handleError(error));
  }

  // Executes the file uploading to firebase https://firebase.google.com/docs/storage/web/upload-files
  pushUploadMainImg(key: string, images: Images) {
    // console.log(key);
    // console.log(images);
    let storageRef = firebase.storage().ref();
    this.uploadTask = storageRef.child(`${this.basePath}/${this.baseItem}/${images.file.name}`).put(images.file);

    this.uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot: firebase.storage.UploadTaskSnapshot) => {
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
    let id = 'mainImg';
    this.db.list(`${this.baseItem}/${key}/images`).update(id, images);
  }

  // Writes the file details to the realtime db
  private deleteFileData(key: string) {
    return this.db.list(`${this.basePath}/${this.baseItem}/`).remove(key);
  }

  // Firebase files must have unique names in their respective storage dir
  // So the name serves as a unique key
  private deleteFileStorage(name: string) {
    let storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${this.baseItem}/${name}`).delete();
  }

  // Default error handling for all actions
  private handleError(error) {
    console.log(error);
  }
}
