import { Component, OnInit, Input } from '@angular/core';
import { SinksService } from './shared/sink.service';
import { Sink, Images } from './shared/sink';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { FlashMessagesService } from 'angular2-flash-messages/module';

@Component({
  selector: 'sink-detail',
  templateUrl: './sink-detail.component.html',
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
export class SinkDetailComponent implements OnInit {
  @Input() sink: Sink;

  selectedFiles: FileList;
  currentUpload: Images;

  constructor(private router: Router, private sinkSvc: SinksService, public flashMessage: FlashMessagesService) {}

  ngOnInit() {}

  imageMain() {
    const images = this.sink.images;
    const mainImg = _.find(images, { title: 'mainImg' });
    // console.log(mainImg);
    return mainImg.url;
  }

  updateTimeStamp() {
    const date = new Date();
    this.sinkSvc.updateItem(this.sink.$key, { timeStamp: date });
  }

  updateActive(value: boolean) {
    this.sinkSvc.updateItem(this.sink.$key, { active: value });
  }

  deleteItem() {
    this.sinkSvc.deleteItem(this.sink.$key);
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
    this.sinkSvc.pushUploadMainImg(this.sink.$key, value);
    this.flashMessage.show('Image uploading', { cssClass: 'alert-info', timeout: 3000 });
  }

  onSelect(sink: Sink) {
    this.router.navigate(['dashboard/sink', sink.$key]);
  }
}
