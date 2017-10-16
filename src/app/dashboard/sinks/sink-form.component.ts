import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SinkNew } from './shared/sink';
import { SinksService } from './shared/sink.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sink-form',
  template: `
  <div class="input-group">
    <span class="input-group-addon"><i class="fa fa-magic" aria-hidden="true"></i>
    <input placeholder="Sink Title" name="titleJS" class="input" [(ngModel)]="sink.title"
    onkeydown = "if (event.keyCode == 13) document.getElementById('btnAddSinks').click()" 
   required minlength="2" maxlength="23" #title='ngModel' autofocus>
    </span>
    <button id="btnAddSinks" class="btn btn-success" (click)='createItem()' [disabled]="!title.valid">Add</button>
  </div>
  <div *ngIf="title.dirty">
    <span *ngIf='sink.errors; then errors else valid'>template renders here...</span>
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
export class SinkFormComponent implements OnInit {

  sink: SinkNew = new SinkNew();
  title: string;

  constructor(
      private sinkSvc: SinksService,
      private route: ActivatedRoute
      ) { }

  ngOnInit() {
    this.title = this.route.snapshot.params.id;
    // console.log(this.title);
  }

  createItem() {
    this.sinkSvc.updateItem(this.sink.title, { title: this.sink.title });
    this.sink = new SinkNew(); // reset item
  }

}
