import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { AccessService } from './shared/access.service';
import { Access, Images, Option } from './shared/access';
import * as _ from 'lodash';
import { FlashMessagesService } from 'angular2-flash-messages/module';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';

@Component({
  selector: 'access-detail',
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '(document:mousedown)': 'onClick($event)'
  },
  templateUrl: './access-detail.component.html',
  styles: [
    `
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
        max-height: 50px;
        float: right;
      }
      .fa-pencil-square-o {
        display: none;
      }

      span:hover .fa-pencil-square-o {
        display: inline;
        cursor: pointer;
      }
    `
  ]
})
export class AccessDetailComponent implements OnInit {
  toggle: boolean;

  @Input() access: Access;
  options: FirebaseListObservable<Option[]>;

  selectedFiles: FileList;
  currentUpload: Images;

  constructor(private accessSvc: AccessService, private _eref: ElementRef, public flashMessage: FlashMessagesService) {}

  ngOnInit() {
    this.options = this.getOptions();
  }

  imageMain() {
    const images = this.access.images;
    const mainImg = _.find(images, { title: 'mainImg' });
    console.log(mainImg);
    return mainImg.url;
  }

  getOptions() {
    if (this.access.options) {
      this.options = this.accessSvc.getOptions(this.access.$key);
      return this.options;
    }
  }

  setToggle() {
    return (this.toggle = true);
  }

  onClick(event) {
    if (!this._eref.nativeElement.contains(event.target)) {
      this.toggle = null;
    }
  }

  updateTimeStamp() {
    const date = new Date();
    this.accessSvc.updateItem(this.access.$key, { timeStamp: date });
  }

  updateActive(value: boolean) {
    this.accessSvc.updateItem(this.access.$key, { active: value });
  }

  deleteItem() {
    this.accessSvc.deleteItem(this.access.$key);
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  uploadSingle() {
    const file = this.selectedFiles.item(0);
    this.currentUpload = new Images(file);
    // this.upSvc.pushUpload(this.currentUpload);
    const value = this.currentUpload;
    // console.log(value);
    this.accessSvc.pushUploadMainImg(this.access.$key, value);
    this.flashMessage.show('Image uploading', { cssClass: 'alert-info', timeout: 3000 });
  }

  updatePrice(value) {
    this.flashMessage.show('Price updated to ' + value, { cssClass: 'alert-info', timeout: 3000 });
    this.accessSvc.updateItem(this.access.$key, { price: value });
    this.toggle = null;
  }

  addOption(value) {
    this.flashMessage.show('Option added: ' + value, { cssClass: 'alert-info', timeout: 3000 });
    const obj = { title: value };
    this.accessSvc.updateOptionAccessory(this.access.$key, obj);
  }
}
