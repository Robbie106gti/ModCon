import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Vanity, Skews } from '../../dashboard/vanities/shared/vanity';
import { Access, Option } from '../../dashboard/access/shared/access';
import { Item, Slides, Numbers } from '../../home/shared/shared';
import { Pantry } from '../../dashboard/pantries/shared/pantry';
import { Color } from '../../dashboard/materials/shared/material';
import { Top } from '../../dashboard/tops/shared/top';
import { Sink } from '../../dashboard/sinks/shared/sink';
import { Featurette } from '../../ui/featurette/featurette';
import { ModsService } from '../vanities/vanity-view/skews/mods/mods.service';
import { Configuration } from '../../dashboard/configs/shared/configuration';

@Injectable()
export class SharedService {
  private basePath = 'vanities';

  vanities: FirebaseListObservable<Vanity[]> = null; //  list of objects
  vanity: FirebaseObjectObservable<Vanity> = null; //   single object
  skews: FirebaseListObservable<Skews[]> = null; //  list of objects
  colors: FirebaseListObservable<Color[]> = null; //  list of objects
  skew: FirebaseObjectObservable<Skews> = null; //   single object
  configs: FirebaseListObservable<Configuration[]>;
  accessories: FirebaseListObservable<Access[]> = null; //  list object
  access: FirebaseObjectObservable<Access> = null; //   single object
  pantry: FirebaseObjectObservable<Pantry> = null; //   single object
  color: FirebaseObjectObservable<Color> = null; //   single object
  top: FirebaseObjectObservable<Top> = null; //   single object
  sink: FirebaseObjectObservable<Sink> = null; //   single object
  items: FirebaseListObservable<Item[]> = null; //  list of objects
  item: FirebaseObjectObservable<Item> = null; //   single object
  featurettes: FirebaseListObservable<Featurette[]> = null; //  list of objects
  slides: FirebaseListObservable<Slides[]> = null; //  list of objects
  numbers: FirebaseObjectObservable<Numbers> = null;
  number2: FirebaseObjectObservable<Numbers[]> = null;
  options: FirebaseListObservable<Option[]> = null;
  snapshot: any;
  title: string;
  news: FirebaseObjectObservable<any>;
  values: any;

  constructor(private db: AngularFireDatabase, private mods: ModsService) {}

  updateNumbers(key, value) {
    const ref = `numbers/`;
    const obj = { [key]: value };
    this.db
      .object(ref)
      .update(obj)
      .catch(error => this.handleError(error));
  }

  // Return an observable list with optional query
  // You will usually call this from OnInit in a component
  getColorsList(key: string, mat: string, query = {}): FirebaseListObservable<Item[]> {
    this.items = this.db.list(`vanities/${key}/colors/${mat}`, {
      query: {}
    });
    return this.items;
  }

  getPantriesList(key: string, query = {}): FirebaseListObservable<Item[]> {
    this.items = this.db.list(`vanities/${key}/pantries`, {
      query: {}
    });
    return this.items;
  }

  getAccessList(key: string, skew: string, query = {}): FirebaseListObservable<Item[]> {
    this.items = this.db.list(`vanities/${key}/skews/${skew}/accessories`, {
      query: {}
    });
    return this.items;
  }

  getSkewsList(key: string, query = {}): FirebaseListObservable<Skews[]> {
    this.skews = this.db.list(`vanities/${key}/skews`, {
      query: {}
    });
    return this.skews;
  }

  getCounterList(key: string, query = {}): FirebaseListObservable<Item[]> {
    this.items = this.db.list(`vanities/${key}/counters`, {
      query: {}
    });
    return this.items;
  }

  getSinksList(key: string, query = {}): FirebaseListObservable<Item[]> {
    this.items = this.db.list(`counter-tops/${key}/sinks`, {
      query: {}
    });
    return this.items;
  }

  getTopsList(key: string, skew: string, query = {}): FirebaseListObservable<Item[]> {
    this.items = this.db.list(`vanities/${key}/skews/${skew}/counter-tops`, {
      query: {}
    });
    return this.items;
  }

  getMaterialList(key: string, query = {}): FirebaseListObservable<Item[]> {
    this.items = this.db.list(`vanities/${key}/colors`, {
      query: {}
    });
    return this.items;
  }

  getColorsMed(key: string): FirebaseListObservable<Color[]> {
    this.colors = this.db.list(`materials/${key}/colors`);
    return this.colors;
  }

  getColors(key: string, mat: string, query = {}): FirebaseListObservable<Item[]> {
    this.items = this.db.list(`vanities/${key}/colors/${mat}`, {
      query: {}
    });
    return this.items;
  }

  getSlides(query = {}): FirebaseListObservable<Slides[]> {
    this.slides = this.db.list(`home/slides/`, {
      query: {}
    });
    return this.slides;
  }

  getFeaturettes(query = {}): FirebaseListObservable<Featurette[]> {
    this.featurettes = this.db.list(`home/featurette/`, {
      query: {}
    });
    return this.featurettes;
  }

  // Return a single item
  findVanityByTitle(title): FirebaseListObservable<Vanity[]> {
    this.vanities = this.db.list('vanities', {
      query: {
        orderByChild: 'title',
        equalTo: title
      }
    });
    return this.vanities;
  }

  // Return a single observable item
  getVanity(key: string): FirebaseObjectObservable<Vanity> {
    const matPath = `/${this.basePath}/${key}`;
    // console.log(matPath);
    this.vanity = this.db.object(matPath);
    return this.vanity;
  }

  // Return a single observable item
  getSkew(key: string, skew: string): FirebaseObjectObservable<Skews> {
    let matPath = `/${this.basePath}/${key}/skews/${skew}`;
    // console.log(matPath);
    this.skew = this.db.object(matPath);
    return this.skew;
  }

  // Return a single observable item
  getNumbers(key: string, skew: string): FirebaseObjectObservable<Skews> {
    const matPath = `/${this.basePath}/`;
    // console.log(matPath);
    this.skew = this.db.object(matPath);
    console.log(this.skew);
    return this.skew;
  }

  // Return a single item
  getConfigs(): FirebaseListObservable<Configuration[]> {
    const active = true;
    this.configs = this.db.list('configurations', {
      query: {
        orderByChild: 'active',
        equalTo: active
      }
    });
    return this.configs;
  }

  // Return a single item
  getAccessories(): FirebaseListObservable<Access[]> {
    const active = true;
    this.accessories = this.db.list('accessories', {
      query: {
        orderByChild: 'active',
        equalTo: active
      }
    });
    return this.accessories;
  }

  // Return a single observable item
  getAcces(key: string): FirebaseObjectObservable<Access> {
    const local = 'accessories';
    const matPath = `${local}/${key}`;
    // console.log(matPath);
    this.access = this.db.object(matPath);
    return this.access;
  }

  getOptions(key: string): FirebaseListObservable<Option[]> {
    const local = 'accessories';
    const matPath = `${local}/${key}/options`;
    this.options = this.db.list(matPath);
    // console.log(matPath);
    return this.options;
  }

  // Return a single observable item
  getCounter(key: string): FirebaseObjectObservable<Access> {
    const local = 'counters';
    const matPath = `${local}/${key}`;
    // console.log(matPath);
    this.access = this.db.object(matPath);
    return this.access;
  }

  // Return a single observable item
  getTop(key: string): FirebaseObjectObservable<Top> {
    const local = 'counter-tops';
    const matPath = `${local}/${key}`;
    // console.log(matPath);
    this.top = this.db.object(matPath);
    return this.top;
  }

  // Return a single observable item
  getTopSink(key: string) {
    const matTop = `counter-tops/${key}`;
    console.log(matTop);
    this.news = this.db.object(matTop);
  }

  // Return a single observable item
  getSink(key: string): FirebaseObjectObservable<Sink> {
    const local = 'sinks';
    const matPath = `${local}/${key}`;
    // console.log(matPath);
    this.sink = this.db.object(matPath);
    return this.sink;
  }

  getPantry(key: string): FirebaseObjectObservable<Pantry> {
    const local = 'pantries';
    const matPath = `${local}/${key}`;
    // console.log(matPath);
    this.pantry = this.db.object(matPath);
    return this.pantry;
  }

  getColor(mat: string, key: string): FirebaseObjectObservable<Color> {
    let local = 'materials';
    const matPath = `${local}/${mat}/colors/${key}`;
    // console.log(matPath);
    this.color = this.db.object(matPath);
    return this.color;
  }

  // Default error handling for all actions
  private handleError(error) {
    console.log(error);
  }
}
