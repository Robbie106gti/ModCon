import { Component, Input } from '@angular/core';
import { Sink } from '../../../../../dashboard/sinks/shared/sink';
import { Item } from '../../../../../items/shared/item';

@Component({
  selector: 'sink-view',
  template: `
      <img class="access" src="{{ sink?.images?.mainImg.url || '#none'}}" >
  `,
  styles: [`
  .access{
    max-height: 150px;
    border-left: 1px solid #f1f1f1;
    box-shadow: 5px 5px 3px #ccc;
  }

  .access:hover {
    border: 1px solid #80D0FF;
    max-height: 160px;
    padding-top: 0px;
    margin-bottom: -10px;
  }
  `]
})

export class SinkViewComponent {
  @Input() itemTop: Item;
  @Input() sink: Sink;

  constructor() { }
}
