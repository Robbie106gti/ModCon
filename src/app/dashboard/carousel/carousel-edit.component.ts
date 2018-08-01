import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { Slides } from '../../home/shared/shared';
import { HomeService } from '../../dashboard/shared/home.service';

@Component({
  selector: 'carousel-edit',
  template: `
  <div class="row">
    <form class="form-group col-md-6 col-md-offset-6">
      <div class="input-group">
        <span class="input-group-addon btn btn-info alert-info" (click)="add(slide.value)"><i class="fa fa-address-card-o" aria-hidden="true"></i></span>
        <input class="form-control" #slide type="text" name="slide" (keyup.enter)="add(slide.value)" type="text" placeholder="Title slide">
      </div>
    </form>
    <br>
    <ul>
      <carousel-list *ngFor="let slide of slides | async" [slide]='slide'></carousel-list>
    </ul>
  </div>
`
})
export class CarouselEditComponent implements OnInit {
  slides: FirebaseListObservable<Slides[]>;

  constructor(private home: HomeService) {}

  ngOnInit() {
    this.slides = this.home.getSlides();
  }

  add(value: string) {
    const obj = {
      title: value,
      text: 'Description',
      image:
        'https://firebasestorage.googleapis.com/v0/b/modcon-2b3c7.appspot.com/o/assets%2FnoImage-01.jpg?alt=media&token=6a82abe8-8d8b-4ad0-93c5-b6398c03fc24'
    };
    this.home.createSlide(obj);
  }
}
