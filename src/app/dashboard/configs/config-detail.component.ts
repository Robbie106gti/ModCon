import { Component, OnInit, Input } from '@angular/core';
import { ConfigsService } from './shared/config.service';
import { Config, Images } from './shared/config';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { FlashMessagesService } from 'angular2-flash-messages/module';

@Component({
  selector: 'config-detail',
  templateUrl: './config-detail.component.html',
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
        max-height: 50px;
        float: right;
    }
  `]
})
export class ConfigDetailComponent implements OnInit {

  @Input() config: Config;

  selectedFiles: FileList;
  currentUpload: Images;

  constructor(
    private router: Router,
    private configSvc: ConfigsService,
    public flashMessage: FlashMessagesService
    ) { }

  ngOnInit() {
  }

  imageMain () {
    let images = this.config.images;
    let mainImg = _.find(images, { 'title': 'mainImg' });
    // console.log(mainImg);
    return mainImg.url;
  }

  updateTimeStamp() {
    let date = new Date();
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
    let file = this.selectedFiles.item(0);
    this.currentUpload = new Images(file);
    // this.upSvc.pushUpload(this.currentUpload);
    let value = this.currentUpload;
    // console.log(value);
    this.configSvc.pushUploadMainImg(this.config.$key, value);
    this.flashMessage.show('Image uploading', {cssClass: 'alert-info', timeout: 3000});
  }

 onSelect(config: Config) {
   this.router.navigate(['dashboard/configuration', config.$key]);
  }
}
