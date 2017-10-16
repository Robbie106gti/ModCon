import { Component, OnInit, Input } from '@angular/core';
import { MatService } from '../shared/materials.service';
import { Mat, Images } from '../shared/material';
import { ActivatedRoute } from '@angular/router';
import { UploadService } from '../../../uploads/shared/upload.service';
import * as _ from 'lodash';
import { FlashMessagesService } from 'angular2-flash-messages/module';
import { FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'material-edit',
  templateUrl: './material-edit.component.html'
})
export class MaterialEditComponent implements OnInit {
  instance: any;
  id: any;
  title: string;

  constructor(
    private route: ActivatedRoute,
    private matSvc: MatService,
    public flashMessage: FlashMessagesService
    ) { }

  ngOnInit() {
        this.title = this.route.snapshot.params.id;
       // this.mat = this.matSvc.getItem(this.title);
        this.instance = this.matSvc.findMatByTitle(this.title);
  }

  updateTimeStamp() {
    let date = new Date();
    // console.log(this.title);
    this.matSvc.updateItem(this.title, { timeStamp: date });
  }

  updateActive(value: boolean) {
    this.matSvc.updateItem(this.title, { active: value });
  }

  deleteItem() {
    this.matSvc.deleteItem(this.title);
  }

}
