import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { TopsService } from './shared/top.service';
import { Top, Images } from './shared/top';
import { Router } from '@angular/router';
import { UploadService } from '../../uploads/shared/upload.service';
import * as _ from 'lodash';
import { FlashMessagesService } from 'angular2-flash-messages/module';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Sink } from '../sinks/shared/sink';
import { SinksService } from '../sinks/shared/sink.service';

@Component({
  selector: 'top-detail',
  // tslint:disable-next-line:use-host-property-decorator
  host: {
      '(document:mousedown)': 'onClick($event)',
  },
  templateUrl: './top-detail.component.html',
  styles: [`
    label {
      cursor: pointer;
      /* Style as you please, it will become the visible UI component. */
    }

    .upload-photo {
      opacity: 0;
      display: none;
      position: absolute;
      z-index: -1;
    }

    .MatImg {
        max-height: 75px;
        float: right;
    }
  `]
})
export class TopDetailComponent implements OnInit {
  toggle: boolean;

  @Input() top: Top;
  sinks: FirebaseListObservable<Sink[]>;
  private count: number;

  selectedFiles: FileList;
  currentUpload: Images;

  constructor(
    private router: Router,
    private db: AngularFireDatabase,
    private topSvc: TopsService,
    private sinkSvc: SinksService,
    private _eref: ElementRef,
    public flashMessage: FlashMessagesService
    ) {
  }

  ngOnInit() {
    this.sinks = this.sinkSvc.getItemsList();
  }

  imageMain () {
    let images = this.top.images;
    let mainImg = _.find(images, { 'title': 'mainImg' });
    // console.log(mainImg);
    return mainImg.url;
  }

  countNrs(key) {
      const ref = `counter-tops/${this.top.$key}/${key}`;
      this.db.object(ref).subscribe((obj) => {
            return this.count = obj;
       });
       let seqNum = _.countBy(this.count, 'length');
       this.count = seqNum.undefined;
       // console.log(this.count);
      return this.count;
  }

  setToggle() {
      return this.toggle = true;
  }

  onClick(event) {
      if (!this._eref.nativeElement.contains(event.target)) {
          this.toggle = null;
      }
  }

  updateTimeStamp() {
    let date = new Date();
    this.topSvc.updateItem(this.top.$key, { timeStamp: date });
  }

  updateActive(value: boolean) {
    this.topSvc.updateItem(this.top.$key, { active: value });
  }

  deleteItem() {
    this.topSvc.deleteItem(this.top.$key);
  }

  detectFiles(event) {
      this.selectedFiles = event.target.files;
  }

  uploadSingle() {
    let file = this.selectedFiles.item(0);
    this.currentUpload = new Images(file);
    // this.upSvc.pushUpload(this.currentUpload);
    let value = this.currentUpload;
    // console.log(value);
    this.topSvc.pushUploadMainImg(this.top.$key, value);
    this.flashMessage.show('Image uploading', {cssClass: 'alert-info', timeout: 3000});
  }

 onSelect(top: Top) {
   this.router.navigate(['dashboard/counter-top', top.$key]);
  }

  editPrice (value) {
    let obj = { 'price': value };
    this.topSvc.updateItem(this.top.$key, obj);
    this.flashMessage.show('Updating price to ' + value + ' for item ' + this.top.title, {cssClass: 'alert-info', timeout: 3000});
    return this.toggle = null;
  }
}
