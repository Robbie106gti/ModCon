import { Component, OnInit, Input } from '@angular/core';
import { Option } from './option';
import { OptionsService } from './options.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Images } from '../access/shared/access';

@Component({
  selector: 'option-detail',
  template: `
<div class="col-sm-4 col-md-3 col-xs-6">
  <div class="panel panel-default">
    <div class="panel-body">
      <img class="MatImg" src="{{ option.image.url }}" alt="{{ option.title || 'missing title' }}">
      <h4>
          {{ option.title || 'missing title' }}
      </h4>
    </div>
    <div class="panel-footer">
      <label for="upload-photo{{ option.title || 'missing title' }}">
        <i class="fa fa-file-image-o" aria-hidden="true"></i>
        <input type="file" name="photo" id="upload-photo{{ option.title || 'missing title' }}" class="upload-photo" (change)="detectFiles($event)">
      </label>
      <button type="button" class="btn btn-success btn-xs" (click)="uploadSingle()"><i class="fa fa-cloud-upload" aria-hidden="true"></i></button>
      <div class="btn-group pull-right">
        <span type="button" class="btn btn-success btn-xs" *ngIf='option.active' (click)='updateActive(false)'><i class="fa fa-check-square-o" aria-hidden="true"></i></span>
        <span type="button" class="btn btn-warning btn-xs" *ngIf='!option.active' (click)='updateActive(true)'><i class="fa fa-square-o" aria-hidden="true"></i></span>
        <span type="button" class="btn btn-danger btn-xs" (click)='deleteItem()'><i class="fa fa-trash-o" aria-hidden="true"></i></span>
      </div>
    </div>
  </div>
</div>
  `,
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
export class OptionDetailComponent implements OnInit {
  @Input() option: Option;

  selectedFiles: FileList;
  currentUpload: Images;

  constructor(private optionSvc: OptionsService, public flashMessage: FlashMessagesService) {}

  ngOnInit() {}

  updateActive(value: boolean) {
    this.optionSvc.updateItem(this.option.$key, { active: value });
  }

  deleteItem() {
    this.optionSvc.deleteItem(this.option.$key);
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  uploadSingle() {
    const file = this.selectedFiles.item(0);
    this.currentUpload = new Images(file);
    this.optionSvc.pushUploadImg(this.option.$key, this.currentUpload);
    this.flashMessage.show('Image uploading', { cssClass: 'alert-info', timeout: 3000 });
  }
}
