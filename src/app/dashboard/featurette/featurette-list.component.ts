import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Featurette, List } from 'app/ui/featurette/featurette';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { HomeService } from 'app/dashboard/shared/home.service';
import { Vanity, Images } from 'app/dashboard/vanities/shared/vanity';
import { VanityService } from 'app/dashboard/vanities/shared/vanity.service';

@Component({
  selector: 'featurette-list',
    host: {
        '(document:mousedown)': 'onClick($event)',
    },
  templateUrl: `./featurette-list.component.html`,
styles: [`
  .max{
    max-height: 100px;
  }
.fa-pencil-square-o, .do {
    display: none;
}
.list:hover .fa-pencil-square-o, .change1:hover .do, .change:hover .do {
    display: inline;
}
`]
})
export class FeaturetteListComponent implements OnInit {
  @Input() featurette: Featurette;
  toggle: boolean;
  lists: FirebaseListObservable<List[]>;
  images: FirebaseListObservable<Images[]>;
  obj: any;
  cat: any;

constructor(
  private db: AngularFireDatabase,
  private home: HomeService,
  private vanitySvc: VanityService,
  private _eref: ElementRef
  ) { }

ngOnInit() {
  this.lists = this.home.getLists(this.featurette.$key);
  this.images = this.home.getImages(this.featurette.title);
  this.cat = { 'key': 'featurette', 'title': this.featurette.title, 'id': this.featurette.$key  };
}

setToggle() {
    return this.toggle = true;
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
      this.obj = {'text': value};
      this.home.createLiItem(this.featurette.$key, this.obj);

  }

  leftOrRight(): boolean {
    return this.featurette ? this.featurette.left : null;
  }

  updateTitle(title: string) {
    this.obj = {'title': title};
    this.home.updateItem(this.featurette.$key, this.obj);
  }

  toLeft() {
    const left = {'left': true};
    this.home.updateItem(this.featurette.$key, left);
  }

  toRight() {
    const right = {'left': false};
    this.home.updateItem(this.featurette.$key, right);

  }

}
