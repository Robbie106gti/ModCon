import { Component, OnInit, Input } from '@angular/core';
import { MatService } from '../shared/materials.service';
import { ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages/module';

@Component({
  selector: 'material-edit',
  templateUrl: './material-edit.component.html'
})
export class MaterialEditComponent implements OnInit {
  instance: any;
  id: any;
  title: string;

  constructor(private route: ActivatedRoute, private matSvc: MatService, public flashMessage: FlashMessagesService) {}

  ngOnInit() {
    this.title = this.route.snapshot.params.id;
    // this.mat = this.matSvc.getItem(this.title);
    this.instance = this.matSvc.findMatByTitle(this.title);
  }

  updateTimeStamp() {
    const date = new Date();
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
