import { Component, OnInit } from '@angular/core';
import { Color } from '../../shared/material';
import { MatService } from '../../shared/materials.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'colors',
  template: `
    <div class="row">
        <div class="col-xs-6 col-sm-5 col-sm-offset-">
            <h1>colors</h1>
        </div>
        <color-form class="col-xs-6 col-sm-3"></color-form>
    </div>
    <div class="row">
        <hr>
        <div *ngFor="let color of colors | async">
            <color-detail [color]='color'></color-detail>
        </div>
    </div>
  `
})
export class ColorComponent implements OnInit {
  colors: FirebaseListObservable<Color[]>;
  id: any;
  title: string;

  constructor(
      private matSvc: MatService,
      private route: ActivatedRoute
      ) { }

  ngOnInit() {
    this.title = this.route.snapshot.params.id;
    this.colors = this.matSvc.getColorsList(this.title);
  }
}
