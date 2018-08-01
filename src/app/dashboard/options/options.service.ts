import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  FirebaseListObservable,
  FirebaseObjectObservable
} from 'angularfire2/database-deprecated';
import * as firebase from 'firebase';
import { Upload } from '../../uploads/shared/upload';
import { Images } from '../access/shared/access';
import { Option, Default } from './option';

@Injectable()
export class OptionsService {
  private basePath = 'uploads';
  private baseItem = 'options/location';

  private uploadTask: firebase.storage.UploadTask;
  uploads: FirebaseListObservable<Upload[]>;
  options: FirebaseListObservable<Option[]> = null; //  list of objects
  defaults: FirebaseListObservable<Default[]> = null; //  list of objects
  option: FirebaseObjectObservable<Option> = null; //   single object
  snapshot: any;
  title: string;

  constructor(private db: AngularFireDatabase) {}

  createItem(obj) {
    this.db.list(`/options/location`).push(obj);
  }

  getOptions() {
    this.options = this.db.list(`/options/location`);
    return this.options;
  }

  getDefaults() {
    this.defaults = this.db.list(`/options/default`);
    return this.defaults;
  }

  updateActive(defaultKey, skewKey, title, option): void {
    const path = `options/${option}/${defaultKey}/skews`;
    const path2 = `vanities/${title}/skews/${skewKey}/option/${option}`;
    const value = { [skewKey]: true };
    const value2 = { [defaultKey]: true };
    this.db
      .object(path)
      .update(value)
      .catch(error => console.log(error));
    this.db
      .object(path2)
      .update(value2)
      .catch(error => console.log(error));
  }

  delActive(defaultKey, skewKey, title, option): void {
    const path = `options/${option}/${defaultKey}/skews`;
    const path2 = `vanities/${title}/skews/${skewKey}/option/${option}`;
    this.db
      .object(path)
      .remove()
      .catch(error => console.log(error));
    this.db
      .object(path2)
      .remove()
      .catch(error => console.log(error));
  }
  // Create item or Update an exisiting item
  updateItem(key: string, value: any): void {
    this.options.update(key, value).catch(error => this.handleError(error));
  }

  // Deletes a single item
  deleteItem(key: string): void {
    this.options.remove(key).catch(error => this.handleError(error));
  }

  // Executes the file uploading to firebase https://firebase.google.com/docs/storage/web/upload-files
  pushUploadImg(key: string, images: Images) {
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
    const id = 'image';
    this.db.list(`${this.baseItem}/${key}`).update(id, images);
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
