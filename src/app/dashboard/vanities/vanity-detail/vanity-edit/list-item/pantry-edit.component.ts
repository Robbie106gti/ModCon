import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { Pantry, Vanities } from '../../../../../dashboard/pantries/shared/pantry';
import { PantriesService } from '../../../../../dashboard/pantries/shared/pantry.service';

@Component({
  selector: 'pantry-edit',
  template: `
  <li><span type="button" class="btn btn-xs">
    <input type='checkbox' id='{{pantry.title}}' [checked]="info" (change)="info = !info" class='tags-checkbox sr-only'/>
    <label for='{{pantry.title}}'>
        <i class="fa fa-toggle-off" aria-hidden="true" (click)='updateActivePantry(true)'></i>
        <i class="fa fa-toggle-on" aria-hidden="true" (click)='updateActivePantry(false)'></i>
      <span class='label-content'>{{pantry.title}}</span>
    </label></span>
  </li>
  `,
  styles: [
    `
      input[type='checkbox'].tags-checkbox:checked + label > i:first-of-type,
      input[type='checkbox'].tags-checkbox + label > i:last-of-type {
        display: none;
      }
      input[type='checkbox'].tags-checkbox:checked + label > i:last-of-type {
        display: inline-block;
      }

      li:hover {
        cursor: pointer;
        background-color: #647db3;
      }
    `
  ]
})
export class PantryEditComponent implements OnInit {
  id: any;
  title: string;
  @Input() pantry: Pantry;
  @Input() vanities: Vanities;
  info: boolean = false;

  constructor(private route: ActivatedRoute, private pantrySvc: PantriesService, private db: AngularFireDatabase) {
    this.title = this.route.snapshot.params.id;
  }

  ngOnInit() {
    // this.vanities.subscribe(() => this.showSpinner = false);
    this.info = this.pantryInfo;
  }

  get pantryInfo(): boolean {
    const ref = `pantries/${this.pantry.$key}/vanities/${this.title}`;
    this.db.object(ref).subscribe(obj => {
      return (this.info = obj.$exists());
    });
    // console.log(this.info);
    return this.info;
  }

  updateActivePantry(value: boolean) {
    if (value === true) {
      this.pantrySvc.updatePantry(this.pantry.$key, this.title);
    } else {
      this.pantrySvc.delPantry(this.pantry.$key, this.title);
    }
  }
}
