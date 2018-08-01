import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { Skews } from '../../../shared/vanity';
import { AccessService } from '../../../../access/shared/access.service';
import { Accesss } from '../../../../access/shared/access';

@Component({
  selector: 'access-edit',
  template: `
  <li><span type="button" class="btn btn-xs">
    <input type='checkbox' id='{{access.title}}' [checked]="info" (change)="info = !info" class='tags-checkbox sr-only'/>
    <label for='{{access.title}}'>
        <i class="fa fa-toggle-off" aria-hidden="true" (click)='updateActiveAccess(true)'></i>
        <i class="fa fa-toggle-on" aria-hidden="true" (click)='updateActiveAccess(false)'></i>
      <span class='label-content'>{{access.title}}</span>
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
export class AccessEditComponent implements OnInit {
  id: any;
  title: string;
  @Input() access: Accesss;
  @Input() skew: Skews;
  info: boolean = false;

  constructor(private route: ActivatedRoute, private db: AngularFireDatabase, private accessSvc: AccessService) {
    this.title = this.route.snapshot.params.id;
  }

  ngOnInit() {
    this.info = this.infoBoo;
    // console.log(this.skew);
    // console.log(this.access);
  }

  get infoBoo(): boolean {
    const ref = `accessories/${this.access.$key}/skews/${this.skew.$key}`;
    this.db.object(ref).subscribe(obj => {
      return (this.info = obj.$exists());
    });
    // console.log(this.info);
    return this.info;
  }

  updateActiveAccess(value: boolean) {
    // console.log('Access: ' + this.access.$key + ', Skew: ' + this.skew.$key + ', title: ' + this.title);
    if (value === true) {
      this.accessSvc.updateAccess(this.access.$key, this.skew.$key, this.title);
    } else {
      this.accessSvc.delAccess(this.access.$key, this.skew.$key, this.title);
    }
  }
}
