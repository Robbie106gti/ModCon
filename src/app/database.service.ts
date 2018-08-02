import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable, from } from 'rxjs';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { map, take, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class DatabaseService {
  constructor(public afdb: AngularFireDatabase) {}

  getListWQ(str: string, query?: {}) {
    return this.afdb.list(str);
  }

  getList(str: string) {
    return this.afdb.list(str).valueChanges();
  }

  getObject(str: string) {
    return this.afdb.object(str).valueChanges();
  }
}
