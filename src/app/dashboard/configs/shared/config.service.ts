import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Configuration, Images } from './configuration';
import { Upload } from '../../../uploads/shared/upload';

@Injectable()
export class ConfigsService {

  private basePath = 'uploads';
  private baseItem = 'configurations';

  private uploadTask: firebase.storage.UploadTask;
  uploads: FirebaseListObservable<Upload[]>;
  configs: FirebaseListObservable<Configuration[]> = null; //  list of objects
  config: FirebaseObjectObservable<Configuration> = null; //   single object
  snapshot: any;
  title: string;

  constructor(private db: AngularFireDatabase) { }

  // Return an observable list with optional query
  // You will usually call this from OnInit in a component
  getItemsList(query={}): FirebaseListObservable<Configuration[]> {
      this.configs = this.db.list(this.baseItem, {
            query: {
                orderByChild: 'title'
            }
        });
    return this.configs;
  }

  // Return a single observable item
  getItem(key: string): FirebaseObjectObservable<Configuration> {
    const matPath =  `/${this.baseItem}/${key}`;
    console.log(matPath);
    this.config = this.db.object(matPath);
    return this.config;
  }

  // Return a single item
  findMatByTitle(title): FirebaseListObservable<Configuration[]> {
        this.configs = this.db.list(this.baseItem, {
            query: {
                orderByChild: 'title',
                equalTo: title
            }
        });
    return this.configs;
  }

  // Create item or Update an exisiting item
  updateItem(key: string, value: any): void {
    this.configs.update(key, value)
      .catch(error => this.handleError(error));
  }

  // Deletes a single item
  deleteItem(key: string): void {
      this.configs.remove(key)
        .catch(error => this.handleError(error));
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
    images['title'] = 'mainImg';
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
