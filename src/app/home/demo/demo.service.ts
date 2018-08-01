import { Injectable } from '@angular/core';
import { FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database-deprecated';
import { Pantry } from '../../dashboard/pantries/shared/pantry';
import { Color } from '../../dashboard/materials/shared/material';

@Injectable()
export class DemoService {
  access: FirebaseObjectObservable<any>;
  pantry: FirebaseObjectObservable<Pantry>;
  mat: FirebaseObjectObservable<Color>;

  constructor(private db: AngularFireDatabase) { }

  getAccessory(obj) {
    this.access = this.db.object(`accessories/${obj['1'].path}`);
    return this.access;
  }

  getPantry (obj) {
    this.pantry = this.db.object(`pantries/${obj['2'].path}`);
    return this.pantry;
  }

  getMaterial (obj) {
    this.mat = this.db.object(`materials/${obj['1'].path}/colors/${obj['2'].path}`);
    return this.mat;
  }

}
