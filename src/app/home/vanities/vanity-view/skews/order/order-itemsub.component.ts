import { ItemSku, ItemsSub, OrderItem } from './orderItem';
import { Component, Input, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { OrderService } from './order.service';

@Component({
  selector: 'order-itemsub',
  templateUrl: './order-itemsub.component.html',
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
    // this.itemsSub.subscribe( data => console.log(data));
    // console.log(this.arr);
    // console.log(this.array);
  }
  delete () {
    this.arr['totals'] = this.orderItem.totals;
    this.arr['itemID'] = this.orderItem.id;
    this.arr['item'] = this.orderItem.$key;
    // console.log(this.arr);
    this.order.subItemDelete(this.arr);
  }
}
