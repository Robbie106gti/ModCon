import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  FirebaseListObservable,
  FirebaseObjectObservable
} from 'angularfire2/database-deprecated';
import * as firebase from 'firebase';
import 'firebase/firestorage';
import { Option, Access, Images } from './access';
import { Upload } from '../../../uploads/shared/upload';

@Injectable()
export class AccessService {
  private basePath = 'uploads';
  private baseItem = 'accessories';

  private uploadTask: firebase.storage.UploadTask;
  uploads: FirebaseListObservable<Upload[]>;
  accesss: FirebaseListObservable<Access[]> = null; //  list of objects
  access: FirebaseObjectObservable<Access> = null; //   single object
  options: FirebaseListObservable<Option[]> = null; //  list of objects
  snapshot: any;
  title: string;

  constructor(private db: AngularFireDatabase) {
    /*    super();
    this.load();*/
    this.getItemsList().subscribe(access => {
      localStorage.setItem('accessories', JSON.stringify(this.accesss));
    });
  }

  // Return an observable list with optional query
  // You will usually call this from OnInit in a component
  getItemsList(query = {}): FirebaseListObservable<Access[]> {
    this.accesss = this.db.list(this.baseItem, {
      // preserveSnapshot: true,
      query: {
        orderByChild: 'title'
      }
    });
    // console.log(this.snapshot);
    // this.accesss = this.db.list('/users').subscribe((obj) => {};
    // console.log('How many times do i run?');
    return this.accesss;
  }

  getOptions(key: string): FirebaseListObservable<Option[]> {
    const path = `${this.baseItem}/${key}/options`;
    this.options = this.db.list(path);
    // console.log(this.options);
    return this.options;
  }

  /*  get setItemsLocal(): any {
    let accessories = this.getItemsList();
    localStorage.setItem('accessories', JSON.stringify(accessories));
    return this.accesss = accessories;
  }*/

  getAccess() {
    if (localStorage.getItem('accessories') === null || localStorage.getItem('accessories') === undefined) {
      const accessories = this.getItemsList();
      localStorage.setItem('accessories', JSON.stringify(accessories));
      console.log('local storage is empty');
      console.log(accessories);
      return accessories;
    } else {
      const accessories = JSON.parse(localStorage.getItem('accessories'));
      console.log('local storage has smth');
      console.log(accessories);
      return accessories;
    }
  }

  // Return a single observable item
  getItem(key: string): FirebaseObjectObservable<Access> {
    const matPath = `/${this.baseItem}/${key}`;
    console.log(matPath);
    this.access = this.db.object(matPath);
    return this.access;
  }

  // Return a single item
  findMatByTitle(title): FirebaseListObservable<Access[]> {
    this.accesss = this.db.list(this.baseItem, {
      query: {
        orderByChild: 'title',
        equalTo: title
      }
    });
    return this.accesss;
  }

  // Create item or Update an exisiting item
  updateItem(key: string, value: any): void {
    this.accesss.update(key, value).catch(error => this.handleError(error));
  }

  // Create item or Update an exisiting item
  updateOptions(access: string, key: string, obj: any): void {
    const ref = this.db.list(`accessories/${access}/options/`);
    ref.update(key, obj).catch(error => this.handleError(error));
  }

  updateOptionAccessory(key: string, obj: any): void {
    const ref = this.db.list(`accessories/${key}/options`);
    ref.push(obj);
  }

  // Update an exisiting item
  updateAccess(key: string, skew: string, title: string): void {
    const path = `accessories/${key}/skews`;
    const path2 = `vanities/${title}/skews/${skew}/accessories`;
    const value = { [skew]: true };
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
  delAccess(key: string, skew: string, title: string): void {
    const path = `accessories/${key}/skews/${skew}`;
    const path2 = `vanities/${title}/skews/${skew}/accessories/${key}`;
    this.db
      .object(path)
      .remove()
      .catch(error => console.log(error));
    this.db
      .object(path2)
      .remove()
      .catch(error => console.log(error));
  }

  delOption(key: string, option: string): void {
    const path = `accessories/${key}/options/${option}`;
    this.db
      .object(path)
      .remove()
      .catch(error => console.log(error));
  }

  // Deletes a single item
  deleteItem(key: string): void {
    this.accesss.remove(key).catch(error => this.handleError(error));
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
