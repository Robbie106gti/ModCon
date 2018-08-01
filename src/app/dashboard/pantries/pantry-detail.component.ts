import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { PantriesService } from './shared/pantry.service';
import { Pantry, Images } from './shared/pantry';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { FlashMessagesService } from 'angular2-flash-messages/module';

@Component({
  selector: 'pantry-detail',
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '(document:mousedown)': 'onClick($event)'
  },
  templateUrl: './pantry-detail.component.html',
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
        max-height: 150px;
        float: right;
      }
    `
  ]
})
export class PantryDetailComponent implements OnInit {
  toggle: boolean;

  @Input() pantry: Pantry;

  selectedFiles: FileList;
  currentUpload: Images;

  constructor(
    private router: Router,
    private pantrySvc: PantriesService,
    private _eref: ElementRef,
    public flashMessage: FlashMessagesService
  ) {}

  ngOnInit() {}

  imageMain() {
    const images = this.pantry.images;
    const mainImg = _.find(images, { title: 'mainImg' });
    // console.log(mainImg);
    return mainImg.url;
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
    this.pantrySvc.updateItem(this.pantry.$key, { timeStamp: date });
  }

  updateActive(value: boolean) {
    this.pantrySvc.updateItem(this.pantry.$key, { active: value });
  }

  editPrice(value) {
    const obj = { price: value };
    this.pantrySvc.updateItem(this.pantry.$key, obj);
    this.flashMessage.show('Updating price to ' + value + ' for item ' + this.pantry.title, {
      cssClass: 'alert-info',
      timeout: 3000
    });
    return (this.toggle = null);
  }

  deleteItem() {
    this.pantrySvc.deleteItem(this.pantry.$key);
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
    this.pantrySvc.pushUploadMainImg(this.pantry.$key, value);
    this.flashMessage.show('Image uploading', { cssClass: 'alert-info', timeout: 3000 });
  }

  onSelect(pantry: Pantry) {
    this.router.navigate(['dashboard/counter-pantry', pantry.$key]);
  }
}
