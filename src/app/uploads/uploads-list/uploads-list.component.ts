import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { UploadService } from '../shared/upload.service';
import { Upload } from '../shared/upload';

@Component({
  selector: 'uploads-list',
  templateUrl: './uploads-list.component.html'
})
export class UploadsListComponent implements OnInit {

  uploads: FirebaseListObservable<Upload[]>;
  showSpinner: boolean = true;

  constructor(private upSvc: UploadService) { }

  ngOnInit() {
    this.uploads = this.upSvc.getUploads({limitToLast: 5});
    this.uploads.subscribe(() => this.showSpinner = false);
  }


}
