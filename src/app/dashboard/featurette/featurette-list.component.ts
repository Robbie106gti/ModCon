import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Featurette, List } from '../../ui/featurette/featurette';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { HomeService } from '../../dashboard/shared/home.service';
import { Images } from '../../dashboard/vanities/shared/vanity';

@Component({
  selector: 'featurette-list',
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '(document:mousedown)': 'onClick($event)'
  },
  templateUrl: `./featurette-list.component.html`,
  styles: [
    `
      .max {
        max-height: 100px;
      }
      .fa-pencil-square-o,
      .do {
        display: none;
      }
      .list:hover .fa-pencil-square-o,
      .change1:hover .do,
      .change:hover .do {
        display: inline;
      }
    `
  ]
})
export class FeaturetteListComponent implements OnInit {
  @Input() featurette: Featurette;
  toggle: boolean;
  lists: FirebaseListObservable<List[]>;
  images: FirebaseListObservable<Images[]>;
  obj: any;
  cat: any;

  constructor(private home: HomeService, private _eref: ElementRef) {}

  ngOnInit() {
    this.lists = this.home.getLists(this.featurette.$key);
    this.images = this.home.getImages(this.featurette.title);
    this.cat = { key: 'featurette', title: this.featurette.title, id: this.featurette.$key };
  }

  setToggle() {
    return (this.toggle = true);
  }
  onClick(event) {
    if (!this._eref.nativeElement.contains(event.target)) {
      this.toggle = null;
    }
  }

  remove() {
    this.home.deleteItem(this.featurette.$key);
  }

  add(value) {
    this.obj = { text: value };
    this.home.createLiItem(this.featurette.$key, this.obj);
  }

  leftOrRight(): boolean {
    return this.featurette ? this.featurette.left : null;
  }

  updateTitle(title: string) {
    this.obj = { title: title };
    this.home.updateItem(this.featurette.$key, this.obj);
  }

  toLeft() {
    const left = { left: true };
    this.home.updateItem(this.featurette.$key, left);
  }

  toRight() {
    const right = { left: false };
    this.home.updateItem(this.featurette.$key, right);
  }
}
