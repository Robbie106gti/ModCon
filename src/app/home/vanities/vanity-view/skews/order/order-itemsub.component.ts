import { ItemSku, ItemsSub, OrderItem } from './orderItem';
import { Component, Input, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { OrderService } from './order.service';

@Component({
  selector: 'order-itemsub',
  template: `
    <div class="notification">
    <button *ngIf="completed" class="delete" (click)="delete()"></button>
    <h4>{{ arr.type | titlecase}} - {{ (itemsSub | async)?.sku }}</h4>
    <dl>
        <dt>SKU: </dt>
        <dd>{{ (itemsSub | async)?.sku }}</dd>
        <dt>Price each: </dt>
        <dd *ngIf="arr.type === 'pantry'">$ {{ ((itemsSub | async)?.price * (itemSku | async)?.materialPrice) * cur | number:'1.2-2'}}</dd>
        <dd *ngIf="arr.type !== 'pantry'">$ {{ (itemsSub | async)?.price * cur | number:'1.2-2'}}</dd>
        <dt>Options: </dt>
        <dd *ngIf="arr.type === 'pantry'">Material: {{ (itemSku | async)?.material }}</dd>
        <dd *ngIf="arr.type === 'pantry'">Color: {{ (itemSku | async)?.color }}</dd>
        <dd *ngIf="arr.type !== 'pantry'">Color: {{ (itemsSub | async)?.color }}</dd>
        <dd>Option: {{ (itemsSub | async)?.option || '-'}}</dd>
        <dd>Quantity: {{ (itemsSub | async)?.quantity || 1}}</dd>
        <dd>Location: {{ (itemsSub | async)?.location || '-'}}</dd>
        <dd *ngIf="arr.type === 'counter'">Sink: {{ (itemsSub | async)?.sink || '-'}}</dd>
        <br *ngIf="arr.type === 'accessory'">
    </dl>
    <div>
        <h5>Total item:</h5>
        <p *ngIf="arr.type === 'pantry'">
            $ {{ ((itemsSub | async)?.price * (itemSku | async)?.materialPrice) * ((itemsSub | async)?.quantity || 1) * cur | number:'1.2-2' }}
        </p>
        <p *ngIf="arr.type !== 'pantry'">
            $ {{ (itemsSub | async)?.price * ((itemsSub | async)?.quantity || 1) * cur | number:'1.2-2' }}
        </p>
    </div>
    <ng-template #price>
        <p>{{ (itemsSub | async)?.price * cur | number:'1.2-2' }}</p>
    </ng-template>
    </div>
  `,
  styleUrls: ['./order.component.css']
})
export class OrderItemSubComponent implements OnInit {
  @Input() arr: any;
  @Input() itemSku: ItemSku;
  @Input() array: any;
  @Input() orderItem: OrderItem;
  @Input() completed: boolean;
  @Input() cur: number;
  itemsSub: FirebaseObjectObservable<ItemsSub>;

  constructor(
    private order: OrderService
      ) {
    }

  ngOnInit() {
    this.itemsSub = this.order.getCurrentOrderItemSub(this.arr.id);
    this.itemsSub.subscribe( data => console.log(data));
  }
  delete () {
    this.arr['totals'] = this.orderItem.totals;
    this.arr['itemID'] = this.orderItem.id;
    this.arr['item'] = this.orderItem.$key;
    // console.log(this.arr);
    this.order.subItemDelete(this.arr);
  }
}
