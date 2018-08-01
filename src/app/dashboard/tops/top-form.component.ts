import { Component, OnInit } from '@angular/core';
import { TopNew } from './shared/top';
import { TopsService } from './shared/top.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'top-form',
  template: `
<div class="input-group">
  <span class="input-group-addon">
    <i class="fa fa-magic" aria-hidden="true"></i>
    <input placeholder="Counter-Top Title" name="titleJS" class="input" [(ngModel)]="top.title" onkeydown="if (event.keyCode == 13) document.getElementById('btnAddTops').click()"
      required minlength="2" maxlength="23" #title='ngModel' autofocus>
  </span>
  <button id="btnAddTops" class="btn btn-success" (click)='createItem()' [disabled]="!title.valid">Add</button>
</div>
<div *ngIf="title.dirty">
  <span *ngIf='top.errors; then errors else valid'>template renders here...</span>
</div>
<ng-template #valid>
  <p class="help is-success">looks good!</p>
</ng-template>

<ng-template #errors>
  <p class="help is-danger">form contains errors!</p>
</ng-template>
  `,
  styles: [``]
})
export class TopFormComponent implements OnInit {
  top: TopNew = new TopNew();
  title: string;

  constructor(private topSvc: TopsService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.title = this.route.snapshot.params.id;
    // console.log(this.title);
  }

  createItem() {
    this.topSvc.updateItem(this.top.title, { title: this.top.title });
    this.top = new TopNew(); // reset item
  }
}
