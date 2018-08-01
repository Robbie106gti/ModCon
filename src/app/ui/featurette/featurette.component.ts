import { Component, OnInit, Input } from '@angular/core';
import { Featurette, List } from './featurette';
import { HomeService } from '../../dashboard/shared/home.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';

@Component({
  selector: 'featurette',
  template: `
  <div *ngIf="leftOrRight(); else right">
  <hr class="featurette-divider">
  <div class="row featurette" >
    <div class="col-md-7 col-md-push-5">
      <h2 class="featurette-heading"><a routerLink="/home/vanities/{{featurette.title}}">{{featurette.title}}</a></h2>
      <ul>
        <li *ngFor="let list of lists | async"><p class="lead">{{list.text}}</p></li>
      </ul>
    </div>
    <div class="col-md-5 col-md-pull-7">
      <img class="featurette-image img-responsive center-block max" alt="{{featurette.title}}" src="{{featurette.imgUrl}}">
    </div>
  </div>
  </div>

  <ng-template #right>
  <hr class="featurette-divider">
  <div class="row featurette" >
    <div class="col-md-7">
      <h2 class="featurette-heading"><a routerLink="/home/vanities/{{featurette.title}}">{{featurette.title}}</a></h2>
      <ul>
        <li *ngFor="let list of lists | async"><p class="lead">{{list.text}}</p></li>
      </ul>
    </div>
    <div class="col-md-5">
      <img class="featurette-image img-responsive center-block max" alt="{{featurette.title}}" src="{{featurette.imgUrl}}">
    </div>
  </div>
  </ng-template>
`,
styles: [`
  .max{
    max-height: 350px;
  }
`]
})
export class FeaturetteComponent implements OnInit {
  @Input() featurette: Featurette;
  lists: FirebaseListObservable<List[]>;

constructor(
  private home: HomeService
  ) { }

ngOnInit() {
  this.lists = this.home.getLists(this.featurette.$key);
}

makeUrl () {
  let baseUrl = 'home/vanities/' + this.featurette.title;
  return baseUrl;
}



  leftOrRight(): boolean {
    return this.featurette ? this.featurette.left : null;
  }

}
