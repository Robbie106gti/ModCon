import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { SharedService } from '../shared/shared.service';
import { Slides } from '../shared/shared';

@Component({
  selector: 'carousel-demo',
  templateUrl: './carousel-demo.component.html'
})
export class CarouselDemoComponent {
  public myInterval: number = 5000;
  public noWrapSlides: boolean = false;
  slides: FirebaseListObservable<Slides[]>;

  constructor(
    private shared: SharedService
  ) {
    this.slides = this.shared.getSlides();
  }

}
