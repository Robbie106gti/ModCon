import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccessNew } from './shared/access';
import { AccessService } from './shared/access.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'access-form',
  template: `
  <div class="input-group">
    <span class="input-group-addon"><i class="fa fa-magic" aria-hidden="true"></i>
    <input placeholder="Accessories Title" name="titleJS" class="input" [(ngModel)]="access.title"
    onkeydown = "if (event.keyCode == 13) document.getElementById('btnAddAccess').click()"
   required minlength="2" maxlength="23" #title='ngModel' autofocus>
    </span>
    <button id="btnAddAccess" class="btn btn-success" (click)='createItem()' [disabled]="!title.valid">Add</button>
  </div>
  <div *ngIf="title.dirty">
    <span *ngIf='access.errors; then errors else valid'>template renders here...</span>
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
export class AccessFormComponent implements OnInit {
  access: AccessNew = new AccessNew();
  title: string;

  constructor(private Accessvc: AccessService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.title = this.route.snapshot.params.id;
    // console.log(this.title);
  }

  createItem() {
    this.Accessvc.updateItem(this.access.title, { title: this.access.title });
    this.access = new AccessNew(); // reset item
  }
}
