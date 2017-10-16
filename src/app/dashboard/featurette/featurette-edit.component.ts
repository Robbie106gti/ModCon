import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Featurette } from 'app/ui/featurette/featurette';
import { HomeService } from 'app/dashboard/shared/home.service';

@Component({
  selector: 'featurette-edit',
  template: `
  <div class="row">  
    <form class="form-group col-md-6 col-md-offset-6">
      <div class="input-group">
        <span class="input-group-addon btn btn-info alert-info" (click)="add(feat.value)"><i class="fa fa-address-card-o" aria-hidden="true"></i></span>
        <input class="form-control" #feat type="text" name="feat" (keyup.enter)="add(feat.value)" type="text" placeholder="Title featurette">
      </div>
    </form>
    <br>
    <ul>
      <featurette-list *ngFor="let featurette of featurettes | async" [featurette]='featurette'></featurette-list>
    </ul> 
  </div>
`
})
export class FeaturetteEditComponent implements OnInit {
  featurettes: FirebaseListObservable<Featurette[]>;

  constructor(
  private home: HomeService
  ) {
  }

  ngOnInit() {
    this.featurettes = this.home.getFeaturettes();
  }

  add(value) {
    let obj = {'title': value, 'left': true, 'imgUrl': 'https://firebasestorage.googleapis.com/v0/b/modcon-2b3c7.appspot.com/o/assets%2FnoImage-01.jpg?alt=media&token=6a82abe8-8d8b-4ad0-93c5-b6398c03fc24'};
    this.home.createItem(obj);
  }

}
