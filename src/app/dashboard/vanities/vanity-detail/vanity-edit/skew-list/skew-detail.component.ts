import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { FlashMessagesService } from 'angular2-flash-messages/module';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Rx';

import { VanityService } from '../../../shared/vanity.service';
import { Skews, Images, Drawing } from '../../../shared/vanity';
import { Access } from '../../../../access/shared/access';
import { Top } from '../../../../tops/shared/top';
import { UploadService } from '../../../../../uploads/shared/upload.service';
import { TopsService } from '../../../../tops/shared/top.service';
import { AccessService } from '../../../../access/shared/access.service';
import { SharedService } from '../../../../../home/shared/shared.service';
import { Numbers } from '../../../../../home/shared/shared';
import { AppState } from '../../../../../state/state';
import { Store } from '@ngrx/store';
import { Sum } from '../../../../../state/sum/sum.model';

@Component({
  selector: 'skew-detail',
  templateUrl: './skew-detail.component.html',
  styleUrls: ['./skew-detail.component.css']
})
export class SkewDetailComponent implements OnInit {

  @Input() skew: Skews;
  @Input() accesss: Access;
  @Input() tops: Top;
  numbers: any[];
  title: string;
  item: any;
  can: number;
  private count: number;
  usd: number;
  sum$: Observable<Sum>;
  sum: Sum;
  private currencyObservable: number;

  selectedFiles: FileList;
  currentUpload: Images;
  current2Upload: Drawing;

  constructor(
      private itemSvc: VanityService,
      private route: ActivatedRoute,
      public flashMessage: FlashMessagesService,
      private db: AngularFireDatabase,
      private upSvc: UploadService,
      private topSvc: TopsService,
      private accessSvc: AccessService,
      private store: Store<AppState>,
      private shared: SharedService
      ) { }

  ngOnInit() {
    this.title = this.route.snapshot.params.id;
    this.sum$ = this.store.select(state => state.sum);
    this.sum$.subscribe( sum => this.sum = sum );
  }

  countNrs(key) {
      const ref = `vanities/${this.title}/skews/${this.skew.$key}/${key}`;
      this.db.object(ref).subscribe((obj) => {
            return this.count = obj;
       });
       let seqNum = _.countBy(this.count, 'length');
       this.count = seqNum.undefined;
       // console.log(this.count);
      return this.count;
  }

  calUsd() {
    this.usd = this.skew.canDollar * this.sum.usd;
    return this.usd;
  }

  updateTimeStamp() {
    let date = new Date();
    this.itemSvc.updateSkew(this.skew.$key, { timeStamp: date });
  }

  updateActive(value: boolean) {
    this.itemSvc.updateSkew(this.skew.$key, { active: value });
  }

  updateUs(value) {
    let dollar = value;
    dollar = parseFloat(dollar).toFixed( 2 );
    console.log(dollar);
    this.itemSvc.updateSkew(this.skew.$key, { 'usDollar': dollar });
  }

  updateCan(value) {
    let dollar = this.makeNumber(value);
    dollar = parseFloat(dollar).toFixed( 2 );
    let usDollar = parseInt(dollar, 10) * .85;
    this.updateUs(usDollar);
    console.log(dollar);
    this.itemSvc.updateSkew(this.skew.$key, { 'canDollar': dollar });
  }

  makeNumber(value: string) {
    value = value.replace ( /[^0-9.]/g, '' );
    parseInt(value, 10);
    return value;
  }

  round ( value, dp ) {
    return +parseFloat(value).toFixed( dp );
  }

  deleteItem() {
    this.itemSvc.deleteSkew(this.skew.$key);
  }

  detectFiles(event) {
      this.selectedFiles = event.target.files;
  }


  uploadSingle() {
    let file = this.selectedFiles.item(0);
    this.current2Upload = new Drawing(file);
    let value = Object.assign({vanity: this.title}, {skew: this.skew.$key}, this.current2Upload);
    // console.log(value);
    this.upSvc.pushUploadSkewImg(value);
    this.flashMessage.show('Image uploading', {cssClass: 'alert-info', timeout: 3000});
  }

}
