import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home',
  template: `
  <div class="row">
    <carousel-edit class="col-xs-10 col-xs-push-1"></carousel-edit>
    <featurette-edit class="col-xs-10 col-xs-push-1"></featurette-edit>
  </div>
  `,
  styles: []
})
export class HomeEditsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
