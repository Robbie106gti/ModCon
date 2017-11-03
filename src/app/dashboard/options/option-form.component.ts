import { Component, OnInit } from '@angular/core';
import { Option } from './option';
import { OptionsService } from './options.service';

@Component({
  selector: 'option-form',
  template: `
  <div class="input-group">

  <span class="input-group-addon"><i class="fa fa-magic" aria-hidden="true"></i>
  <input placeholder="Option Title" name="title" class="input" #title
  (keyup.enter)="createItem(title.value)"
 required minlength="2" maxlength="23"type="text" autofocus>

  </span>
  <button id="btnAddMat" class="btn btn-success" (click)="createItem(title.value)" [disabled]="!title.valid">Add</button>
</div>
<div *ngIf="title.dirty">
  <span *ngIf="title.errors; then errors else valid">template renders here...</span>
</div>
<ng-template #valid>
  <p class="help is-success">looks good!</p>
</ng-template>

<ng-template #errors>
  <p class="help is-danger">form contains errors!</p>
</ng-template>
  `
})
export class OptionFormComponent implements OnInit {
    title: string;

    constructor(
        private optionSvc: OptionsService
        ) { }

    ngOnInit() { }

    createItem(value) {
        console.log(value);
        let obj = {
            'title': value,
            'active': true,
            'image': 'https://firebasestorage.googleapis.com/v0/b/modcon-2b3c7.appspot.com/o/assets%2FnoImage-01.jpg?alt=media&token=6a82abe8-8d8b-4ad0-93c5-b6398c03fc24',
            'description': ''
        };
        this.optionSvc.createItem(obj);
    }

}
