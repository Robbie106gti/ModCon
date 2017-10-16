import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Slides } from '../../home/shared/shared';
import { HomeService } from '../shared/home.service';
import { VanityService } from '../vanities/shared/vanity.service';
import { Images } from '../vanities/shared/vanity';

@Component({
  selector: 'carousel-list',
    host: {
        '(document:mousedown)': 'onClick($event)',
    },
  templateUrl: `./carousel-list.component.html`,
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
export class CarouselListComponent implements OnInit {
  @Input() slide: Slides;
  toggle: boolean;
  toggle2: boolean;
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
  this.images = this.home.getImages(this.slide.title);
  this.cat = { 'key': 'slides', 'title': this.slide.title, 'id': this.slide.$key };
}

setToggle() {
    return this.toggle = true;
}

setToggleText() {
    return this.toggle2 = true;
}

onClick(event) {
    if (!this._eref.nativeElement.contains(event.target)) {
        this.toggle = null;
    }
}

updateTitle(title: string) {
  this.obj = {'title': title};
  this.home.updateSlide(this.slide.$key, this.obj);
}

updateText(text: string) {
  this.obj = {'text': text};
  this.home.updateSlide(this.slide.$key, this.obj);
}

remove() {
  this.home.deleteSlide(this.slide.$key);
}

}
