import { Component, OnInit, Input } from '@angular/core';
import { Totals } from './orderItem';

@Component({
  selector: 'order-totals',
  template: `
  <div class="caption">
      <h5>{{ arr?.sku }}</h5>
      <dl>
          <dt>SKU: </dt>
          <dd>$ {{ (arr?.price * arr?.materialPrice ) * cur | number:'1.2-2'  }}</dd>
          <dt>Counter: </dt>
          <dd>$ {{ arr?.totalCounter * cur | number:'1.2-2'  }}</dd>
          <dt>Pantry: </dt>
          <dd>$ {{ (arr?.totalPantry * arr?.materialPrice ) * cur | number:'1.2-2'  }}</dd>
          <dt>Accessories: </dt>
          <dd>$ {{ arr?.totalAccessories * cur | number:'1.2-2'  }}</dd>
          <hr>
          <dd>Total SKU: </dd>
          <dt>$ {{ (((arr?.price + arr?.totalPantry) * arr?.materialPrice) + arr?.totalAccessories + arr?.totalCounter) * cur | number:'1.2-2'  }}</dt>
      </dl>
  </div>
  `,
  styles: [`
  `]
})
export class OrderTotalsComponent implements OnInit {
  @Input() arr: Totals;
  @Input() cur: number;

  constructor() { }

  ngOnInit() {
  }
}
