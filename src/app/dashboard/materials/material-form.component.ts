import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatNew } from './shared/material';
import { MatService } from './shared/materials.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'material-form',
  template: `
  <div class="input-group">
    <span class="input-group-addon"><i class="fa fa-magic" aria-hidden="true"></i>
    <input placeholder="Material Title" name="titleJS" class="input" [(ngModel)]="mat.title"
    onkeydown = "if (event.keyCode == 13) document.getElementById('btnAddMat').click()"
   required minlength="2" maxlength="23" #title='ngModel' autofocus>
    </span>
    <button id="btnAddMat" class="btn btn-success" (click)='createItem()' [disabled]="!title.valid">Add</button>
  </div>
  <div *ngIf="title.dirty">
    <span *ngIf='mat.errors; then errors else valid'>template renders here...</span>
  </div>
  <ng-template #valid>
    <p class="help is-success">looks good!</p>
  </ng-template>

  <ng-template #errors>
    <p class="help is-danger">form contains errors!</p>
  </ng-template>
  `,
  styles: [`
  `]
})
export class MaterialFormComponent implements OnInit {

  mat: MatNew = new MatNew();
  title: string;

  constructor(
      private matSvc: MatService,
      private route: ActivatedRoute
      ) { }

  ngOnInit() {
    this.title = this.route.snapshot.params.id;
    // console.log(this.title);
  }

  createItem() {
    this.matSvc.updateItem(this.mat.title, { title: this.mat.title });
    this.mat = new MatNew(); // reset item
  }

}
