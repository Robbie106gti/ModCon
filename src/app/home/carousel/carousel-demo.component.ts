import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { SharedService } from '../shared/shared.service';
import { Slides } from '../shared/shared';

@Component({
  selector: 'carousel-demo',
  templateUrl: './carousel-demo.component.html',
  styles: [`
    .carousel-caption > a {
      color: rgb(42,62,80);
      display: block;
      background-color: rgba(255, 255, 255, 0.65);
      border-radius: 0.8rem;
      padding: 1rem;
    }
    .carousel-caption > a:hover {
      text-decoration: none;
    }
    p {
      font-size: 2rem;
    }
  `]
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
