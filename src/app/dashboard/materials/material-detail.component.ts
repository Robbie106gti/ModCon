import { Component, OnInit, Input } from '@angular/core';
import { MatService } from './shared/materials.service';
import { Mat, Images } from './shared/material';
import { Router } from '@angular/router';
import { UploadService } from '../../uploads/shared/upload.service';
import * as _ from 'lodash';
import { FlashMessagesService } from 'angular2-flash-messages/module';

@Component({
  selector: 'material-detail',
  templateUrl: './material-detail.component.html',
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
export class MaterialDetailComponent implements OnInit {

  @Input() mat: Mat;

  selectedFiles: FileList;
  currentUpload: Images;

  constructor(
    private router: Router,
    private matSvc: MatService,
    public flashMessage: FlashMessagesService
    ) { }

  ngOnInit() {
  }

  imageMain () {
    let images = this.mat.images;
    let mainImg = _.find(images, { 'title': 'mainImg' });
    // console.log(mainImg);
    return mainImg.url;
  }

  updateTimeStamp() {
    let date = new Date();
    this.matSvc.updateItem(this.mat.$key, { timeStamp: date });
  }

  updateActive(value: boolean) {
    this.matSvc.updateItem(this.mat.$key, { active: value });
  }

  deleteItem() {
    this.matSvc.deleteItem(this.mat.$key);
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
    this.matSvc.pushUploadMainImg(this.mat.$key, value);
    this.flashMessage.show('Image uploading', {cssClass: 'alert-info', timeout: 3000});
  }

 onSelect(mat: Mat) {
   this.router.navigate(['dashboard/material', mat.$key]);
  }
}
