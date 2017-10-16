import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CounterNew } from './shared/counter';
import { CounterService } from './shared/counter.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'counter-form',
  template: `
  <div class="input-group">
    <span class="input-group-addon"><i class="fa fa-magic" aria-hidden="true"></i>
    <input placeholder="Counter Title" name="titleJS" class="input" [(ngModel)]="counter.title"
    onkeydown = "if (event.keyCode == 13) document.getElementById('btnAddCounter').click()" 
   required minlength="2" maxlength="23" #title='ngModel' autofocus>
    </span>
    <button id="btnAddCounter" class="btn btn-success" (click)='createItem()' [disabled]="!title.valid">Add</button>
  </div>
  <div *ngIf="title.dirty">
    <span *ngIf='counter.errors; then errors else valid'>template renders here...</span>
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
export class CounterFormComponent implements OnInit {

  counter: CounterNew = new CounterNew();
  title: string;

  constructor(
      private counterSvc: CounterService,
      private route: ActivatedRoute
      ) { }

  ngOnInit() {
    this.title = this.route.snapshot.params.id;
    // console.log(this.title);
  }

  createItem() {
    this.counterSvc.updateItem(this.counter.title, { title: this.counter.title });
    this.counter = new CounterNew(); // reset item
  }

}
