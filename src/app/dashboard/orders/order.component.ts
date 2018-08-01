import { Component } from '@angular/core';

@Component({
  selector: 'orders-view',
  template: `
    <current-order-view></current-order-view>
    <past-orders></past-orders>
  `
})
export class OrdersComponent {}
