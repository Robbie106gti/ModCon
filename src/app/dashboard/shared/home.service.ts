import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import { Featurette, List } from '../../ui/featurette/featurette';
import { Slides } from '../../home/shared/shared';
import { Images } from '../vanities/shared/vanity';
import { Numbers } from '../../home/shared/shared';
import { Order, ItemOrder, OrderItems, OrderInfo } from '../../home/vanities/vanity-view/skews/order/orderItem';

@Injectable()
export class HomeService {

  private basePath = '/home';
  private pathFeat = '/featurette';
  private pathSlide = '/slides';
  snapshot: any;
  title: string;
  featurettes: FirebaseListObservable<Featurette[]> = null; //  list of objects
  slides: FirebaseListObservable<Slides[]> = null; //  list of objects
  lists: FirebaseListObservable<List[]> = null;
  images: FirebaseListObservable<Images[]> = null;
  numbers: FirebaseListObservable<Numbers[]> = null;
  orders: FirebaseListObservable<Order[]> = null;
  orderItems: FirebaseListObservable<OrderItems[]> = null;
  items: FirebaseListObservable<ItemOrder[]> = null;
  item: FirebaseObjectObservable<any> = null;
  info: FirebaseObjectObservable<OrderInfo> = null;

  constructor(private db: AngularFireDatabase) { }

  getSlides(query= {}): FirebaseListObservable<Slides[]> {
    this.slides = this.db.list(`home/slides/`, {
            query: {
            }
        });
    return this.slides;
  }

  getFeaturettes(query= {}): FirebaseListObservable<Featurette[]> {
    this.featurettes = this.db.list(`home/featurette/`, {
            query: {
            }
        });
    return this.featurettes;
  }

  getLists(key, query= {}): FirebaseListObservable<List[]> {
    this.lists = this.db.list(`home/featurette/${key}/body`, {
            query: {
            }
        });
    return this.lists;
  }

  getImages(key, query= {}): FirebaseListObservable<Images[]> {
    this.images = this.db.list(`vanities/${key}/images`, {
            query: {
            }
        });
    return this.images;
  }

  getUsersOrders(user): FirebaseListObservable<Order[]> {
    let completed = true;
    this.orders = this.db.list(`orders/byUser/${user}`, {
            query: {
              limitToLast: 10,
              orderByChild: 'completed',
              equalTo: completed
            }
        });
    return this.orders;
  }

  getOrderDesk(): FirebaseListObservable<OrderItems[]> {
    let orderDesk = true;
    this.orderItems = this.db.list(`orders/orderItems/`, {
            query: {
              orderByChild: 'orderDesk',
              equalTo: orderDesk
            }
        });
    return this.orderItems;
  }

  getOrderItems(orderId): FirebaseListObservable<ItemOrder[]> {
    this.items = this.db.list(`orders/orderItems/${orderId}/items`);
    return this.items;
  }

  getOrderInfo(orderId): FirebaseObjectObservable<OrderInfo> {
    this.info = this.db.object(`orders/orderItems/${orderId}/info`);
    return this.info;
  }

  getOrderItem(item): FirebaseObjectObservable<any> {
    this.item = this.db.object(`orders/items/${item}`);
    return this.item;
  }

  getOrderItemSub(subItem): FirebaseObjectObservable<any> {
    this.item = this.db.object(`orders/itemsSub/${subItem}`);
    return this.item;
  }

  // Create a brand new slide
  createSlide(value: any): void  {
     this.slides.push(value)
      .catch(error => this.handleError(error));
  }

  // Create a bramd new item
  createItem(value: any): void  {
     this.featurettes.push(value)
      .catch(error => this.handleError(error));
  }

  // Create a bramd new item
  createLiItem(key: string, value: any): void  {
    const ref = this.db.list(`home/featurette/${key}/body`);
    ref.push(value)
      .catch(error => this.handleError(error));
  }

  // Update an exisiting Slide
  updateSlide(key: string, value: any): void {
    this.slides.update(key, value)
      .catch(error => this.handleError(error));
  }

  // Update an exisiting Slide
  updateNumbers(key, value: any): void {
    const ref = this.db.list(`/`);
    ref.update(key, value)
      .catch(error => this.handleError(error));
  }

  // Update an exisiting item
  updateItem(key: string, value: any): void {
    this.featurettes.update(key, value)
      .catch(error => this.handleError(error));
  }

  // Update an exisiting list item
  updateLiItem(feat: string, key: string, value: any): void  {
    const ref = this.db.list(`home/featurette/${feat}/body`);
    ref.update(key, value)
      .catch(error => this.handleError(error));
  }

  // Deletes a single slide
  deleteSlide(key: string): void {
      this.slides.remove(key)
        .catch(error => this.handleError(error));
  }

  // Deletes a single featurette
  deleteItem(key: string): void {
      this.featurettes.remove(key)
        .catch(error => this.handleError(error));
  }

  // Deletes a single list item
  deleteLiItem(key: string, value: any): void  {
    const ref = this.db.list(`home/featurette/${key}/body`);
    ref.remove(value)
      .catch(error => this.handleError(error));
  }

  // Default error handling for all actions
  private handleError(error) {
    console.log(error);
  }
}
