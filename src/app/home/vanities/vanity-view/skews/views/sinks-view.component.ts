import { Component, Input } from '@angular/core';
import { Item } from '../../../../../items/shared/item';

@Component({
  selector: 'sink-view',
  template: `
      <img class="access" src="{{ sink?.images?.mainImg.url || '#none'}}" >
  `,
  styles: [
    `
      .access {
        max-height: 150px;
        max-width: 98%;
        border-left: 1px solid #f1f1f1;
        box-shadow: 5px 5px 3px #ccc;
        cursor: pointer;
      }

      .access:hover {
        border: 1px solid #80d0ff;
        max-height: 160px;
        padding-top: 0px;
        margin-bottom: -2px;
      }
    `
  ]
})
export class SinkViewComponent {
  @Input()
  itemTop: Item;
  @Input()
  sink: any;

  constructor() {}
}
