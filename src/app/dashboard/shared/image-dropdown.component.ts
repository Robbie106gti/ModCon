import { Component, Input } from '@angular/core';
import { Images } from 'app/dashboard/vanities/shared/vanity';
import { HomeService } from 'app/dashboard/shared/home.service';

@Component({
  selector: 'image-dropdown',
  template: `
<li>
    <a (click)="updateImage(image.url)" ><span>
    <img src="{{image.url}}" alt="" class="square"/> 
     - {{image.name}} </span></a>
</li>
`,
styles: [`
.square {
    max-height: 25px;
    margin-right: 10px;
}
li {
    padding-left: 10px;
    padding-right: 10px;
}
li:hover {
    background-color: #2c3e50;
}
a {
    color: #7b8a8b;
}
a:hover {
    color: #fff;
}
`]
})
export class ImageDDComponent {
  @Input() image: Images;
  @Input() cat: any;
  obj: any;

  constructor(
      private home: HomeService
  ) {  }

updateImage(value: string) {
    // console.log(this.cat);
    if (this.cat.key === 'slides') {
        this.obj = {'image': value};
        this.home.updateSlide(this.cat.id, this.obj);
    }
    if (this.cat.key === 'featurette') {
        this.obj = {'imgUrl': value};
        this.home.updateItem(this.cat.id, this.obj);
    }
}

}
