import { Component, Input } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages/module';
import { Images } from '../vanities/shared/vanity';
import { UploadService } from '../../uploads/shared/upload.service';

@Component({
  selector: 'upload-dropdown',
  template: `
<li>
  <span>
    <label for="upload-photo{{ cat.title || 'missing title' }}{{ cat.id || 'missing title' }}">
      Upload image -
      <i class="fa fa-file-image-o" aria-hidden="true"></i>
      <input type="file" name="photo" id="upload-photo{{ cat.title || 'missing title' }}{{ cat.id || 'missing title' }}" class="upload-photo"
        (change)="detectFiles($event)">
    </label>
    <button type="button" class="btn btn-success btn-xs" (click)="uploadSingle()">
      <i class="fa fa-cloud-upload" aria-hidden="true"></i>
    </button>
  </span>
</li>
`,
  styles: [
    `
      .square {
        max-height: 25px;
        margin-right: 10px;
      }
      li {
        padding-left: 10px;
        padding-right: 10px;
      }
      li:hover {
        background-color: #2c3e50;
      }
      span {
        color: #7b8a8b;
      }
      span:hover {
        color: #fff;
      }
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
    `
  ]
})
export class UploadDDComponent {
  currentUpload: Images;
  selectedFiles: FileList;
  @Input() cat: any;
  item: any;

  constructor(public flashMessage: FlashMessagesService, private upSvc: UploadService) {}

  detectFiles(event) {
    this.selectedFiles = event.target.files;
    // console.log(this.selectedFiles);
  }

  uploadSingle() {
    const file = this.selectedFiles.item(0);
    this.currentUpload = new Images(file);
    const value = this.currentUpload;
    this.upSvc.pushUploadVanity(this.cat.title, value);
    this.flashMessage.show('Image uploading', { cssClass: 'alert-info', timeout: 3000 });
  }
}
