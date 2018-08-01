import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { Default } from '../../../../options/option';
import { Skews } from '../../../shared/vanity';
import { OptionsService } from '../../../../options/options.service';

@Component({
  selector: 'default-edit',
  template: `
  <li><span type="button" class="btn btn-xs">
    <input type='checkbox' id='{{default.title}}' [checked]="info" (change)="info = !info" class='tags-checkbox sr-only'/>
    <label for='{{default.title}}'>
        <i class="fa fa-toggle-off" aria-hidden="true" (click)='updateActive(true)'></i>
        <i class="fa fa-toggle-on" aria-hidden="true" (click)='updateActive(false)'></i>
      <span class='label-content'>{{default.title}}</span>
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
export class DefaultEditComponent implements OnInit {
  @Input() default: Default;
  @Input() skew: Skews;
  info: boolean = false;
  title: string;
  options = 'default';

  constructor(private route: ActivatedRoute, private optionSvc: OptionsService, private db: AngularFireDatabase) {
    this.title = this.route.snapshot.params.id;
  }

  ngOnInit() {
    this.info = this.infoBoo;
    // console.log(this.skew);
  }

  get infoBoo(): boolean {
    const ref = `options/default/${this.default.$key}/skews/${this.skew.$key}`;
    this.db.object(ref).subscribe(obj => {
      return (this.info = obj.$exists());
    });
    // console.log(this.info);
    return this.info;
  }

  updateActive(value: boolean) {
    if (value === true) {
      this.optionSvc.updateActive(this.default.$key, this.skew.$key, this.title, this.options);
    } else {
      this.optionSvc.delActive(this.default.$key, this.skew.$key, this.title, this.options);
    }
  }
}
