import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'order-table',
  template: `
        <td>Maine - MA26</td>
        <td>Paint</td>
        <td>Black</td>
        <td>SI26</td>
        <td>Concrete</td>
        <td>MA20-TP</td>
        <td>1</td>
        <td>$ 4,005.25</td>
  `,
  styleUrls: ['../../home/vanities/vanity-view/skews/order/order.component.css']
})
export class OrderTableComponent implements OnInit {
    @Input() item: any;

  constructor() {
      }

  ngOnInit() {
  }
}
