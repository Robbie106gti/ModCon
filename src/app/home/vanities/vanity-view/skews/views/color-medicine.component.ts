import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as _ from 'lodash';
import { Option } from '../../../../../dashboard/access/shared/access';
import { SharedService } from '../../../../shared/shared.service';
import { Color } from '../../../../../dashboard/materials/shared/material';

@Component({
  selector: 'color-medicine',
  template: `
  <b>{{ option.description }}</b><br>
  <div class="wrapper">
      <div class="newColor" *ngFor="let color of colors | async">
        <a (click)="newColor(color)">
          <img class="image" src="{{ color?.color?.url }}" />
          <label><small>{{ color?.title }}</small></label>
        </a>
      </div>
  </div>
  `,
  styles: [`
  .wrapper {
    display: grid;
    padding: 0;
    margin: 0;
    line-height: 1em;
  }
  @media screen and (max-width: 65rem) {
    .wrapper {
      grid-auto-rows: minmax(100px, auto);
      grid-template-columns: repeat(4, 1fr);
    }
    .image {
        max-width: 75px;
        border: solid 1px #ccc;
    }
    .image:hover {
      max-width: 90px;
      margin-top: -1.1em;
    }
  }
  @media screen and (min-width: 65rem) and (max-width: 100rem) {
    .wrapper {
      grid-template-columns: repeat(auto-fit, minmax(5em, 1fr));
      grid-auto-rows: minmax(100px, auto);
    }
    .image {
        max-width: 75px;
        border: solid 1px #ccc;
    }
    .image:hover {
      max-width: 90px;
      margin-top: -1.1em;
    }
  }
  @media screen and (min-width: 100rem) {
    .wrapper {
      grid-template-columns: repeat(8, minmax(5em, 1fr));
      grid-auto-rows: minmax(100px, auto);
    }
    .image {
        max-width: 1fr;
        border: solid 1px #ccc;
    }
    .image:hover {
      max-width: 1fr;
      margin-top: -1.1em;
    }
  }
  .newColor {
    cursor: pointer;
    text-align: center;
  }
  a {
    color: rgb(1,1,1);
  }
  `]
})

export class ColorMedComponent implements OnInit {
  @Input() option: Option;
  colors: FirebaseListObservable<Color[]>;
  @Output() color: EventEmitter<Color> = new EventEmitter();

  constructor(
      private db: AngularFireDatabase,
      private itemSrv: SharedService
      ) {
    }

  ngOnInit() {
    this.colors = this.itemSrv.getColorsMed(this.option.description);
    // this.colors.subscribe(a => console.log(a));
  }

  newColor(color, option) {
    this.color.emit(color);
  }

}
