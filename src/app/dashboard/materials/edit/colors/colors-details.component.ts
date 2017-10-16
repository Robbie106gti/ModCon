import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { MatService } from '../../shared/materials.service';
import { Color, ColorImg } from '../../shared/material';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { FlashMessagesService } from 'angular2-flash-messages/module';

@Component({
  selector: 'color-detail',
  // tslint:disable-next-line:use-host-property-decorator
  host: {
      '(document:mousedown)': 'onClick($event)',
  },
  templateUrl: './colors-details.component.html',
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

    .ColorImg {
        max-width: 50px;
        max-height: 50px;
        float: right;
    }

    .min {
      min-width: 50px;
      cursor: pointer;
    }

    .btn, .fa {
        display: none;
    }

    .list:hover .btn, .list:hover .fa {
        display: inline;
    }
  `]
})
export class ColorDetailComponent implements OnInit {
  toggle: boolean;

  selectedFiles: FileList;
  currentUpload: ColorImg;
  @Input() color: Color;
  title: string;

  constructor(
    private route: ActivatedRoute,
    private matSvc: MatService,
    private _eref: ElementRef,
    public flashMessage: FlashMessagesService
    ) { }

  ngOnInit() {
    this.title = this.route.snapshot.params.id;
  }

  setToggle() {
      return this.toggle = true;
  }

  onClick(event) {
      if (!this._eref.nativeElement.contains(event.target)) {
          this.toggle = null;
      }
  }

  updateText(value) {
      let key = this.color.$key;
      console.log(key);
      console.log(value);
      let obj = {'price': value};
      this.matSvc.updateColor(key, obj);
  }

  remove(value?) {
      let key = this.color.$key;
      // this.matSvc.deleteLiItem(key, value);
  }

  updateTimeStamp() {
    let date = new Date();
    this.matSvc.updateColor(this.color.$key, { timeStamp: date });
  }

  updateActive(value: boolean) {
    this.matSvc.updateColor(this.color.$key, { active: value });
  }

  deleteItem() {
    this.matSvc.deleteColor(this.color.$key);
  }

  detectFiles(event) {
      this.selectedFiles = event.target.files;
  }

  uploadSingle() {
    let file = this.selectedFiles.item(0);
    this.currentUpload = new ColorImg(file);
    let value = Object.assign({material: this.title}, {color: this.color.$key}, this.currentUpload);
    this.matSvc.pushUploadColorImg(value);
    this.flashMessage.show('Image uploading', {cssClass: 'alert-info', timeout: 3000});
  }
}
