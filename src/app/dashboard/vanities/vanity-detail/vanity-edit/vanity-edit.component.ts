import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VanityService } from '../../shared/vanity.service';
import { Vanity, Skews } from '../../shared/vanity';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Pantry } from '../../../../dashboard/pantries/shared/pantry';
import { PantriesService } from '../../../../dashboard/pantries/shared/pantry.service';
import { Access } from '../../../../dashboard/access/shared/access';
import { AccessService } from '../../../../dashboard/access/shared/access.service';
import { Counter } from '../../../../dashboard/counters/shared/counter';
import { CounterService } from '../../../../dashboard/counters/shared/counter.service';
import { MatService } from '../../../../dashboard/materials/shared/materials.service';
import { Color } from '../../../../dashboard/materials/shared/material';
import * as _ from 'lodash';
import { Option, Default } from '../../../options/option';
import { OptionsService } from '../../../options/options.service';

@Component({
  selector: 'vanity-edit',
  templateUrl: './vanity-edit.component.html',
  styleUrls: ['./vanity-edit.component.css']
})
export class VanityEditComponent implements OnInit {
  id: any;
  title: string;

  instance: any;
  private count: number;

  vanities: FirebaseListObservable<Vanity[]> = null; //  list of objects
  skews: FirebaseListObservable<Skews[]>;
  pantries: FirebaseListObservable<Pantry[]>;
  accesss: FirebaseListObservable<Access[]>;
  options: FirebaseListObservable<Option[]> = null; //  list of objects
  defaults: FirebaseListObservable<Default[]> = null; //  list of objects

  counters: FirebaseListObservable<Counter[]>;
  paints: FirebaseListObservable<Color[]>;
  woods: FirebaseListObservable<Color[]>;
  tms: FirebaseListObservable<Color[]>;
  ems: FirebaseListObservable<Color[]>;

  constructor(
    private route: ActivatedRoute,
    private vanitySvc: VanityService,
    private pantrySvc: PantriesService,
    private accessSvc: AccessService,
    private counterSvc: CounterService,
    private db: AngularFireDatabase,
    private optionSvc: OptionsService,
    private matSvc: MatService
  ) {
    this.title = this.route.snapshot.params.id;
    this.instance = this.vanitySvc.findVanityByTitle(this.title);
    this.skews = this.vanitySvc.getSkewsList(this.title);
    this.pantries = this.pantrySvc.getItemsList();
    this.accesss = this.accessSvc.getItemsList();
    this.options = this.optionSvc.getOptions();
    this.defaults = this.optionSvc.getDefaults();
    this.counters = this.counterSvc.getItemsList();
    this.paints = this.matSvc.getColorsList('Paint');
    this.woods = this.matSvc.getColorsList('Wood');
    this.tms = this.matSvc.getColorsList('Textured Melamine');
    this.ems = this.matSvc.getColorsList('Euro Materials');
  }

  ngOnInit() {}

  countNrs(item) {
    const ref = item;
    this.db.object(ref).subscribe(obj => {
      return (this.count = obj);
    });
    const seqNum = _.countBy(this.count, 'length');
    this.count = seqNum.undefined;
    // console.log(this.count);
    return this.count;
  }

  updateTimeStamp() {
    const date = new Date();
    this.vanitySvc.updateItem(this.title, { timeStamp: date });
  }

  updateActive(value: boolean) {
    this.vanitySvc.updateItem(this.title, { active: value });
  }

  deleteItem() {
    this.vanitySvc.deleteSkew(this.title);
  }
}
