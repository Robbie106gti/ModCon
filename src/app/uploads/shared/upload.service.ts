import { Injectable } from '@angular/core';
// import { AngularFire, AngularFireDatabase, FirebaseListObservable } from 'angularfire2';
import { Upload } from './upload';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Images, Skews, Drawing } from '../../dashboard/vanities/shared/vanity';


@Injectable()
export class UploadService {

  constructor(private db: AngularFireDatabase) { }

  private basePath:string = '/uploads';
  private basePathVanity:string = 'vanities';
  private uploadTask: firebase.storage.UploadTask;
  uploads: FirebaseListObservable<Upload[]>;
  // tslint:disable-next-line:member-ordering
  images: FirebaseListObservable<Images[]>;
  // tslint:disable-next-line:member-ordering
  skews: FirebaseListObservable<Skews[]> = null; //  list of objects
  skew: FirebaseObjectObservable<Skews> = null; //   single object
  // tslint:disable-next-line:member-ordering
  imagesSkew: FirebaseListObservable<Drawing[]>;


  getUploads(query={}) {
    this.uploads = this.db.list(this.basePath, {
      query: query
    });
    return this.uploads
  }


  deleteUpload(upload: Upload) {
    this.deleteFileData(upload.$key)
    .then( () => {
      this.deleteFileStorage(upload.name)
    })
    .catch(error => console.log(error))
  }

  // Executes the file uploading to firebase https://firebase.google.com/docs/storage/web/upload-files
  pushUpload(upload: Upload) {
    let storageRef = firebase.storage().ref();
    this.uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);

    this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>  {
        // upload in progress
        upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      },
      (error) => {
        // upload failed
        console.log(error)
      },
      () => {
        // upload success
        upload.url = this.uploadTask.snapshot.downloadURL
        upload.name = upload.file.name;
        this.saveFileData(upload);
      }
    );
  }

  // Executes the file uploading to firebase https://firebase.google.com/docs/storage/web/upload-files
  pushUploadVanity(key: string, images: Images) {
    let storageRef = firebase.storage().ref();
    this.uploadTask = storageRef.child(`${this.basePath}/${images.file.name}`).put(images.file);

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
        this.saveFileImgVanity(key, images);
      }
    );
  }

  // Executes the file uploading to firebase https://firebase.google.com/docs/storage/web/upload-files
  pushUploadSkewImg(value: any) {
    // console.log(key);
    // console.log(images);
    let storageRef = firebase.storage().ref();
    this.uploadTask = storageRef.child(`${this.basePath}/skews/${value.file.name}`).put(value.file);

    this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>  {
        // upload in progress
        value.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        // upload failed
        console.log(error);
      },
      () => {
        // upload success
        value.url = this.uploadTask.snapshot.downloadURL;
        value.name = value.file.name;
        this.saveFileSkewImg(value);
      }
    );
  }

  // Writes the file details to the realtime db
  private saveFileSkewImg(value: any): void {
    let id = 'drawing';
    //console.log(value);
    this.db.list(`${this.basePathVanity}/${value.vanity}/skews/${value.skew}`).update(id, value);
  }

  // Executes the file uploading to firebase https://firebase.google.com/docs/storage/web/upload-files
  pushUploadMainImg(key: string, images: Images) {
    // console.log(key);
    // console.log(images);
    let storageRef = firebase.storage().ref();
    this.uploadTask = storageRef.child(`${this.basePath}/${images.file.name}`).put(images.file);

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
        this.saveFileMainImg(key, images);
      }
    );
  }

  // Writes the file details to the realtime db
  private saveFileMainImg(key: string, images: Images): void {
    let id = 'mainImg';
    this.db.list(`${this.basePathVanity}/${key}/images`).update(id,  images);
  }

  // Writes the file details to the realtime db
  private saveFileImgVanity(key: string, images: Images): void {
    this.db.list(`${this.basePathVanity}/${key}/images`).push(images);
  }

  // Writes the file details to the realtime db
  private deleteFileMainImg(key: string) {
    return this.db.list(`${this.basePath}/`).remove(key);
  }

  // Writes the file details to the realtime db
  private saveFileData(upload: Upload) {
    this.db.list(`${this.basePath}/`).push(upload);
  }

  // Writes the file details to the realtime db
  private deleteFileData(key: string) {
    return this.db.list(`${this.basePath}/`).remove(key);
  }

  // Firebase files must have unique names in their respective storage dir
  // So the name serves as a unique key
  private deleteFileStorage(name:string) {
    let storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete();
  }

  // Default error handling for all actions
  private handleError(error) {
    console.log(error);
  }


}
