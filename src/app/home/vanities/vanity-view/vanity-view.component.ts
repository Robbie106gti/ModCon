import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as _ from 'lodash';

import { Vanity, Skews } from '../../../dashboard/vanities/shared/vanity';
import { Item } from '../../shared/shared';
import { SharedService } from '../../shared/shared.service';
import { VanityService } from '../../../dashboard/vanities/shared/vanity.service';
import { SpinnerService } from '../../../ui/loading-spinner/spinner.service';

@Component({
  selector: 'vanity-view',
  templateUrl: './vanity-view.component.html',
  styleUrls: ['./vanity-view.component.css']
})
export class VanityViewComponent implements OnInit {

  @Input() vanity: Vanity;
  skews: FirebaseListObservable<Skews[]>;
  pantries: FirebaseListObservable<Item[]>;
  paints: FirebaseListObservable<Item[]>;
  woods: FirebaseListObservable<Item[]>;
  tms: FirebaseListObservable<Item[]>;
  ems: FirebaseListObservable<Item[]>;
  private count: any;

  constructor(
    private db: AngularFireDatabase,
    private itemSvc: SharedService,
    private vanitySvc: VanityService,
    private spinner: SpinnerService
    ) {
    this.spinner.changeSpinner('true');
  }

  ngOnInit() {
    this.skews = this.itemSvc.getSkewsList(this.vanity.$key);
    this.pantries = this.itemSvc.getPantriesList(this.vanity.$key);
    this.paints = this.itemSvc.getColorsList(this.vanity.$key, 'Paint');
    this.woods = this.itemSvc.getColorsList(this.vanity.$key, 'Wood');
    this.tms = this.itemSvc.getColorsList(this.vanity.$key, 'Textured Melamine');
    this.ems = this.itemSvc.getColorsList(this.vanity.$key, 'Euro Materials');
    this.skews.take(1).toPromise().then((data) => this.spinner.changeSpinner('false'));
  }

  countNrs(item) {
    const ref = `vanities/${this.vanity.$key}/${item}`;
    this.db.object(ref).subscribe((obj) => {
      return this.count = obj;
    });
    if (this.count.$value === null) {
      this.count = null;
    } else {
      let seqNum = _.countBy(this.count, 'length');
      this.count = seqNum.undefined;
    }
    // console.log(this.count);
    return this.count;
  }

  imageMain () {
    let images = this.vanity.images;
    let mainImg = _.find(images, { 'title': 'mainImg' });
    // console.log(mainImg);
    return mainImg.url;
  }

}
