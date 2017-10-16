import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Top, Images } from './top';
import { Upload } from 'app/uploads/shared/upload';

@Injectable()
export class TopsService {

  private basePath = 'uploads';
  private baseItem = 'counter-tops';

  private uploadTask: firebase.storage.UploadTask;
  uploads: FirebaseListObservable<Upload[]>;
  tops: FirebaseListObservable<Top[]> = null; //  list of objects
  top: FirebaseObjectObservable<Top> = null; //   single object
  snapshot: any;
  title: string;

  constructor(private db: AngularFireDatabase) { }

  // Return an observable list with optional query
  // You will usually call this from OnInit in a component
  getItemsList(): FirebaseListObservable<Top[]> {
      this.tops = this.db.list(this.baseItem, {
            query: {
                orderByChild: 'title'
            }
        });
    return this.tops;
  }

  // Return a single observable item
  getItem(key: string): FirebaseObjectObservable<Top> {
    const matPath =  `/${this.baseItem}/${key}`;
    console.log(matPath);
    this.top = this.db.object(matPath);
    return this.top;
  }

  // Return a single item
  findMatByTitle(title): FirebaseListObservable<Top[]> {
        this.tops = this.db.list(this.baseItem, {
            query: {
                orderByChild: 'title',
                equalTo: title
            }
        });
    return this.tops;
  }

  // Create item or Update an exisiting item
  updateItem(key: string, value: any): void {
    this.tops.update(key, value)
      .catch(error => this.handleError(error));
  }

  // Deletes a single item
  deleteItem(key: string): void {
      this.tops.remove(key)
        .catch(error => this.handleError(error));
  }

  // Update an exisiting item
  updateAccess(key: string, skew: string, title: string): void {
    let path = `counter-tops/${key}/skews`;
    let path2 = `vanities/${title}/skews/${skew}/counter-tops`;
    let value = {[skew]: true};
    let value2 = {[key]: true};
    this.db.object(path).update(value)
      .catch(error => console.log(error));
    this.db.object(path2).update(value2)
      .catch(error => console.log(error));
  }

  // Update an exisiting item
  delAccess(key: string, skew: string, title: string): void {
    let path = `counter-tops/${key}/skews/${skew}`;
    let path2 = `vanities/${title}/skews/${skew}/counter-tops/${key}`;
    this.db.object(path).remove()
      .catch(error => console.log(error));
    this.db.object(path2).remove()
      .catch(error => console.log(error));
  }

  // Executes the file uploading to firebase https://firebase.google.com/docs/storage/web/upload-files
  pushUploadMainImg(key: string, images: Images) {
    // console.log(key);
    // console.log(images);
    let storageRef = firebase.storage().ref();
    this.uploadTask = storageRef.child(`${this.basePath}/${this.baseItem}/${images.file.name}`).put(images.file);

    this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>  {
        // upload in progress
        images.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
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
    this.db.list(`${this.baseItem}/${key}/images`).update(id,  images);
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
