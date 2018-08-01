import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  FirebaseListObservable,
  FirebaseObjectObservable
} from 'angularfire2/database-deprecated';
import * as firebase from 'firebase';
import { Mat, Images, Color } from './material';
import { Upload } from '../../../uploads/shared/upload';

@Injectable()
export class MatService {
  private basePath = 'uploads';
  private baseItem = 'materials';

  private uploadTask: firebase.storage.UploadTask;
  uploads: FirebaseListObservable<Upload[]>;
  mats: FirebaseListObservable<Mat[]> = null; //  list of objects
  mat: FirebaseObjectObservable<Mat> = null; //   single object
  colors: FirebaseListObservable<Color[]> = null; //  list of objects
  color: FirebaseObjectObservable<Color> = null; //   single object
  snapshot: any;
  title: string;

  constructor(private db: AngularFireDatabase) {}

  // Return an observable list with optional query
  // You will usually call this from OnInit in a component
  getItemsList(query = {}): FirebaseListObservable<Mat[]> {
    this.mats = this.db.list('materials', {
      query: {
        orderByChild: 'title'
      }
    });
    return this.mats;
  }

  getColorsList(key: string, query = {}): FirebaseListObservable<Color[]> {
    this.colors = this.db.list(`materials/${key}/colors`, {
      query: {
        orderByChild: 'title'
      }
    });
    return this.colors;
  }

  // Return a single observable item
  getItem(key: string): FirebaseObjectObservable<Mat> {
    const matPath = `/${this.baseItem}/${key}`;
    console.log(matPath);
    this.mat = this.db.object(matPath);
    return this.mat;
  }

  // Return a single item
  findMatByTitle(title): FirebaseListObservable<Mat[]> {
    this.mats = this.db.list('materials', {
      query: {
        orderByChild: 'title',
        equalTo: title
      }
    });
    return this.mats;
  }

  // Create item or Update an exisiting item
  updateItem(key: string, value: any): void {
    this.mats.update(key, value).catch(error => this.handleError(error));
  }

  // Update an exisiting item
  updateColor(key: string, value: any): void {
    /*    console.log('Key:' + key);
    console.log(this.colors);
    console.log(value);*/
    this.colors.update(key, value).catch(error => this.handleError(error));
  }

  updateColorAv(key: string, mat: string, title: string): void {
    const path = `materials/${mat}/colors/${key}/vanities`;
    const path2 = `vanities/${title}/colors/${mat}`;
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

  delColorAv(key: string, mat: string, title: string): void {
    const path = `materials/${mat}/colors/${key}/vanities/${title}`;
    const path2 = `vanities/${title}/colors/${mat}/${key}`;
    this.db
      .object(path)
      .remove()
      .catch(error => console.log(error));
    this.db
      .object(path2)
      .remove()
      .catch(error => console.log(error));
  }

  // Deletes a single item
  deleteItem(key: string): void {
    this.mats.remove(key).catch(error => this.handleError(error));
  }

  // Deletes a single item
  deleteColor(key: string): void {
    this.colors.remove(key).catch(error => this.handleError(error));
  }

  // Executes the file uploading to firebase https://firebase.google.com/docs/storage/web/upload-files
  pushUploadMainImg(key: string, images: Images) {
    // console.log(key);
    // console.log(images);
    const storageRef = firebase.storage().ref();
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
    const id = 'mainImg';
    this.db.list(`${this.baseItem}/${key}/images`).update(id, images);
  }

  // Executes the file uploading to firebase https://firebase.google.com/docs/storage/web/upload-files
  pushUploadColorImg(value: any) {
    // console.log(key);
    // console.log(images);
    const storageRef = firebase.storage().ref();
    this.uploadTask = storageRef
      .child(`${this.basePath}/${this.baseItem}/${value.material}/${value.file.name}`)
      .put(value.file);

    this.uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot: firebase.storage.UploadTaskSnapshot) => {
        // upload in progress
        value.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      error => {
        // upload failed
        console.log(error);
      },
      () => {
        // upload success
        value.url = this.uploadTask.snapshot.downloadURL;
        value.name = value.file.name;
        this.saveFileColor(value);
      }
    );
  }

  // Writes the file details to the realtime db
  private saveFileColor(value: any): void {
    const id = 'color';
    // console.log(value);
    this.db.list(`${this.baseItem}/${value.material}/colors/${value.color}`).update(id, value);
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
