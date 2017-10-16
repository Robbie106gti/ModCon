import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CarouselComponent } from './carousel.component';
import { SlideComponent } from './slide.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
    ],
  declarations: [
    SlideComponent,
    CarouselComponent,
    ],
  exports: [
    SlideComponent,
    CarouselComponent
    ]
})
export class CarouselModule {
}
