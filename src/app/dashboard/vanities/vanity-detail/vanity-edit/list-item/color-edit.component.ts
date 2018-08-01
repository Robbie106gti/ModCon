import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { Color } from '../../../../../dashboard/materials/shared/material';
import { MatService } from '../../../../../dashboard/materials/shared/materials.service';

@Component({
  selector: 'color-edit',
  template: `
  <li>
    <span type="button" class="btn btn-xs">
        <input type='checkbox' id='{{color.title}}' [checked]="info" (change)="info = !info" class='tags-checkbox sr-only'/>
        <label for='{{color.title}}'>
            <i class="fa fa-toggle-off" aria-hidden="true" (click)='updateActive(true)'></i>
            <i class="fa fa-toggle-on" aria-hidden="true" (click)='updateActive(false)'></i>
            <span class='label-content'>{{color.title}}</span>
        </label>
    </span>
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
/*    <input type='checkbox' id='{{paint.title}}' [checked]="info" (change)="info = !info" class='tags-checkbox sr-only'/>
    <label for='{{paint.title}}'>
        <i class="fa fa-toggle-off" aria-hidden="true" (click)='updateActivePantry(true)'></i>
        <i class="fa fa-toggle-on" aria-hidden="true" (click)='updateActivePantry(false)'></i>
      <span class='label-content'>{{paint.title}}</span>
    </label>*/
export class ColorEditComponent implements OnInit {
  id: any;
  title: string;
  info: boolean = false;
  @Input() color: Color;

  constructor(private route: ActivatedRoute, private db: AngularFireDatabase, private matSvc: MatService) {
    this.title = this.route.snapshot.params.id;
  }

  ngOnInit() {
    // this.vanities.subscribe(() => this.showSpinner = false);
    this.info = this.infoBoo;
  }

  get infoBoo(): boolean {
    const ref = `materials/${this.color.material}/colors/${this.color.$key}/vanities/${this.title}`;
    this.db.object(ref).subscribe(obj => {
      return (this.info = obj.$exists());
    });
    // console.log(this.info);
    return this.info;
  }

  updateActive(value: boolean) {
    if (value === true) {
      this.matSvc.updateColorAv(this.color.$key, this.color.material, this.title);
    } else {
      this.matSvc.delColorAv(this.color.$key, this.color.material, this.title);
    }
  }
}
