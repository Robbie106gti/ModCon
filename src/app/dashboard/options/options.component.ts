import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { OptionsService } from './options.service';
import { Option } from './option';

@Component({
  selector: 'options-list',
  template: `
    <div class="row">
    <hr>
        <div class="col-xs-6 col-sm-7 col-sm-offset-">
            <h1>Options</h1>
            <h4>locations of accessories/configurations</h4>
        </div>
        <option-form class="col-xs-6 col-sm-3"></option-form>
    </div>
    <div class="row">
        <option-detail *ngFor="let option of options | async" [option]='option'></option-detail>
    </div>
  `
})
export class OptionsComponent implements OnInit {
  options: FirebaseListObservable<Option[]>;

  constructor(private optionSvc: OptionsService) {}

  ngOnInit() {
    this.options = this.optionSvc.getOptions();
  }
}
