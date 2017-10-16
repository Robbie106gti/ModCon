import { Component, OnInit, Input } from '@angular/core';
import { VanityService } from '../shared/vanity.service';
import { Vanity, Images } from '../shared/vanity';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { FlashMessagesService } from 'angular2-flash-messages/module';
import { UploadService } from '../../../uploads/shared/upload.service';

@Component({
  selector: 'vanity-detail',
  templateUrl: './vanity-detail.component.html',
  styleUrls: ['./vanity-detail.component.css']
})
export class VanityDetailComponent implements OnInit {

  @Input() vanity: Vanity;

  selectedFiles: FileList;
  currentUpload: Images;

  constructor(
    private router: Router,
    private vanitySvc: VanityService,
    public flashMessage: FlashMessagesService,
    private upSvc: UploadService
    ) { }

  ngOnInit() {
  }

  imageMain () {
    let images = this.vanity.images;
    let mainImg = _.find(images, { 'title': 'mainImg' });
    // console.log(mainImg);
    return mainImg.url;
  }

  updateTimeStamp() {
    let date = new Date();
    this.vanitySvc.updateItem(this.vanity.$key, { timeStamp: date });
  }

  updateActive(value: boolean) {
    this.vanitySvc.updateItem(this.vanity.$key, { active: value });
  }

  deleteItem() {
    this.vanitySvc.deleteItem(this.vanity.$key);
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
    this.upSvc.pushUploadMainImg(this.vanity.$key, value);
    this.flashMessage.show('Image uploading', {cssClass: 'alert-info', timeout: 3000});
  }

 onSelect(vanity: Vanity) {
   this.router.navigate(['dashboard/vanity', vanity.$key]);
  }
}
