import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { Top } from '../../../../tops/shared/top';
import { Skews } from '../../../shared/vanity';
import { TopsService } from '../../../../tops/shared/top.service';

@Component({
  selector: 'tops-edit',
  template: `
  <li><span type="button" class="btn btn-xs">
    <input type='checkbox' id='{{top.title}}' [checked]="info" (change)="info = !info" class='tags-checkbox sr-only'/>
    <label for='{{top.title}}'>
        <i class="fa fa-toggle-off" aria-hidden="true" (click)='updateActiveAccess(true)'></i>
        <i class="fa fa-toggle-on" aria-hidden="true" (click)='updateActiveAccess(false)'></i>
      <span class='label-content'>{{top.title}}</span>
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
export class TopEditComponent implements OnInit {
  id: any;
  title: string;
  @Input() top: Top;
  @Input() skew: Skews;
  info: boolean = false;

  constructor(private route: ActivatedRoute, private db: AngularFireDatabase, private topSrv: TopsService) {
    this.title = this.route.snapshot.params.id;
  }

  ngOnInit() {
    this.info = this.infoBoo;
  }

  get infoBoo(): boolean {
    const ref = `counter-tops/${this.top.$key}/skews/${this.skew.$key}`;
    this.db.object(ref).subscribe(obj => {
      return (this.info = obj.$exists());
    });
    // console.log(this.info);
    return this.info;
  }

  updateActiveAccess(value: boolean) {
    // console.log('Access: ' + this.access.$key + ', Skew: ' + this.skew.$key + ', title: ' + this.title);
    if (value === true) {
      this.topSrv.updateAccess(this.top.$key, this.skew.$key, this.title);
    } else {
      this.topSrv.delAccess(this.top.$key, this.skew.$key, this.title);
    }
  }
}
