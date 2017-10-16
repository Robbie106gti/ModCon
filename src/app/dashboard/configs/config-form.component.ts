import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfigNew } from './shared/config';
import { ConfigsService } from './shared/config.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'config-form',
  template: `
  <div class="input-group">
    <span class="input-group-addon"><i class="fa fa-magic" aria-hidden="true"></i>
    <input placeholder="Configuration Title" name="titleJS" class="input" [(ngModel)]="config.title"
    onkeydown = "if (event.keyCode == 13) document.getElementById('btnAddConfigs').click()" 
   required minlength="2" maxlength="23" #title='ngModel' autofocus>
    </span>
    <button id="btnAddConfigs" class="btn btn-success" (click)='createItem()' [disabled]="!title.valid">Add</button>
  </div>
  <div *ngIf="title.dirty">
    <span *ngIf='config.errors; then errors else valid'>template renders here...</span>
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
export class ConfigFormComponent implements OnInit {

  config: ConfigNew = new ConfigNew();
  title: string;

  constructor(
      private configSvc: ConfigsService,
      private route: ActivatedRoute
      ) { }

  ngOnInit() {
    this.title = this.route.snapshot.params.id;
    // console.log(this.title);
  }

  createItem() {
    this.configSvc.updateItem(this.config.title, { title: this.config.title });
    this.config = new ConfigNew(); // reset item
  }

}
