import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as _ from 'lodash';
import { Option } from '../../../../../dashboard/access/shared/access';
import { SharedService } from '../../../../shared/shared.service';
import { Color } from '../../../../../dashboard/materials/shared/material';

@Component({
  selector: 'color-medicine',
  template: `
  <label>{{ option.description }}</label>
  <div class="wrapper">
      <div *ngFor="let color of colors | async">
          <img class="image" src="{{ color?.color?.url }}" />
          <label><small>{{ color?.title }}</small></label>
      </div>
  </div>
  <br>
  `,
  styles: [`
  .wrapper {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
  }
  .image {
      max-width: 75px;
  }
  `]
})

export class ColorMedComponent implements OnInit {
  @Input() option: Option;
  colors: FirebaseListObservable<Color[]>;

  constructor(
      private db: AngularFireDatabase,
      private itemSrv: SharedService
      ) {
    }

  ngOnInit() {
    this.colors = this.itemSrv.getColorsMed(this.option.description);
    this.colors.subscribe(a => console.log(a));
  }
}
