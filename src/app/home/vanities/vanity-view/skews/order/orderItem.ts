export interface OrderItems {
  items: OrderItem[];
  info: OrderInfo;
  orderDesk: boolean;
}
export interface OrderItem {
    $key: string;
    id: string;
    price: number;
    type: string;
    itemsSub: SubItems[];
    totals?: string;
  }

  export interface OrderInfo {
    uid: string;
    completed: boolean;
    orderDesk: boolean;
    currency: number;
    email: string;
    name: string;
    type: string;
    byUser: string;
    totals: Totals[];
  }

  export interface Totals {
    materialPrice: number;
    price: number;
    sku: string;
    total: number;
    accessories: Access[];
    totalPantry: number;
    totalAccessories: number;
    totalCounter: number;
  }

  export interface ItemSku {
    color: string;
    line: string;
    material: string;
    materialPrice: number;
    price: number;
    sku: string;
    uid: string;
    itemsSub: SubItems;
  }

  export interface SubItems {
    id: string;
    type: string;
  }

  export interface Access {
    sku: string;
    price: number;
    quantity: number;
  }

  export interface ItemsSub {
    price: number;
    sku: string;
    uid: string;
    subItemOf: string;
    total: number;
    color: string;
    sink: string;
    location: string;
    option: string;
    quantity: number;
  }

  export interface Order {
    completed: boolean;
    orderId: string;
    timeStamp: number;
  }

  export interface ItemOrder {
    id: string;
    totals: string;
    type: string;
    itemsSub: Ids;
  }

  export interface Ids {
    id: string;
    iikey: string;
    oikey: string;
    totalcat: string;
    type: string;
    iatkey?: string;
    oitkey?: string;
  }
