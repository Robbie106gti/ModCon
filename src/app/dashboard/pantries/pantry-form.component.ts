import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PantryNew } from './shared/pantry';
import { PantriesService } from './shared/pantry.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'pantry-form',
  template: `
  <div class="input-group">
    <span class="input-group-addon"><i class="fa fa-magic" aria-hidden="true"></i>
    <input placeholder="Pantry Title" name="titleJS" class="input" [(ngModel)]="pantry.title"
    onkeydown = "if (event.keyCode == 13) document.getElementById('btnAddPantries').click()" 
   required minlength="2" maxlength="23" #title='ngModel' autofocus>
    </span>
    <button id="btnAddPantries" class="btn btn-success" (click)='createItem()' [disabled]="!title.valid">Add</button>
  </div>
  <div *ngIf="title.dirty">
    <span *ngIf='pantry.errors; then errors else valid'>template renders here...</span>
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
export class PantryFormComponent implements OnInit {

  pantry: PantryNew = new PantryNew();
  title: string;

  constructor(
      private pantrySvc: PantriesService,
      private route: ActivatedRoute
      ) { }

  ngOnInit() {
    this.title = this.route.snapshot.params.id;
    // console.log(this.title);
  }

  createItem() {
    this.pantrySvc.updateItem(this.pantry.title, { title: this.pantry.title });
    this.pantry = new PantryNew(); // reset item
  }

}
