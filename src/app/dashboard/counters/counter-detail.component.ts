import { Component, OnInit, Input } from '@angular/core';
import { CounterService } from './shared/counter.service';
import { Counter, Images } from './shared/counter';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { FlashMessagesService } from 'angular2-flash-messages/module';

@Component({
  selector: 'counter-detail',
  templateUrl: './counter-detail.component.html',
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
export class CounterDetailComponent implements OnInit {

  @Input() counter: Counter;

  selectedFiles: FileList;
  currentUpload: Images;

  constructor(
    private router: Router,
    private counterSvc: CounterService,
    public flashMessage: FlashMessagesService
    ) { }

  ngOnInit() {
  }

    imageMain () {
      let images = this.counter.images;
      let mainImg = _.find(images, { 'title': 'mainImg' });
      // console.log(mainImg);
      return mainImg.url;
    }

  updateTimeStamp() {
    let date = new Date();
    this.counterSvc.updateItem(this.counter.$key, { timeStamp: date });
  }

  updateActive(value: boolean) {
    this.counterSvc.updateItem(this.counter.$key, { active: value });
  }

  deleteItem() {
    this.counterSvc.deleteItem(this.counter.$key);
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
    this.counterSvc.pushUploadMainImg(this.counter.$key, value);
    this.flashMessage.show('Image uploading', {cssClass: 'alert-info', timeout: 3000});
  }

 onSelect(counter: Counter) {
   this.router.navigate(['dashboard/counter', counter.$key]);
  }
}
