import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Color } from '../../shared/material';
import { MatService } from '../../shared/materials.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'color-form',
  template: `
  <div class="input-group">
    <span class="input-group-addon"><i class="fa fa-magic" aria-hidden="true"></i>
    <input placeholder="Color Title" name="titleJS" class="input" [(ngModel)]="color.title"
    onkeydown = "if (event.keyCode == 13) document.getElementById('btnAdd').click()"
   required minlength="2" maxlength="23" #title='ngModel' autofocus>
    </span>
    <button id="btnAdd" class="btn btn-success" (click)='createItem()' [disabled]="!title.valid">Add</button>
  </div>
  <div *ngIf="title.dirty">
    <span *ngIf='title.errors; then errors else valid'>template renders here...</span>
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
export class ColorFormComponent implements OnInit {

  color: Color = new Color();
  title: string;

  constructor(
      private matSvc: MatService,
      private route: ActivatedRoute
      ) { }

  ngOnInit() {
    this.title = this.route.snapshot.params.id;
  }

  createItem() {
    this.matSvc.updateColor(this.color.title, { title: this.color.title });
    this.color = new Color(); // reset item
  }
}
