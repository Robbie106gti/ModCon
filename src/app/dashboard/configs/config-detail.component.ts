import { Component, OnInit, Input } from '@angular/core';
import { ConfigsService } from './shared/config.service';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { FlashMessagesService } from 'angular2-flash-messages/module';
import { Configuration, Images } from './shared/configuration';

@Component({
  selector: 'config-detail',
  templateUrl: './config-detail.component.html',
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
    `
  ]
})
export class ConfigDetailComponent implements OnInit {
  @Input() config: Configuration;

  selectedFiles: FileList;
  currentUpload: Images;
  missing =
    'https://firebasestorage.googleapis.com/v0/b/modcon-2b3c7.appspot.com/o/assets%2FnoImage-01.jpg?alt=media&token=6a82abe8-8d8b-4ad0-93c5-b6398c03fc24';

  constructor(private router: Router, private configSvc: ConfigsService, public flashMessage: FlashMessagesService) {}

  ngOnInit() {}

  imageMain() {
    const images = this.config.images;
    const mainImg = _.find(images, { title: 'mainImg' });
    // console.log(mainImg);
    return mainImg.url;
  }

  updateTimeStamp() {
    const date = new Date();
    this.configSvc.updateItem(this.config.$key, { timeStamp: date });
  }

  updateActive(value: boolean) {
    this.configSvc.updateItem(this.config.$key, { active: value });
  }

  deleteItem() {
    this.configSvc.deleteItem(this.config.$key);
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
    this.configSvc.pushUploadMainImg(this.config.$key, value);
    this.flashMessage.show('Image uploading', { cssClass: 'alert-info', timeout: 3000 });
  }

  onSelect(config: Configuration) {
    this.router.navigate(['dashboard/configuration', config.$key]);
  }
}
