import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { Counter } from '../../../../../dashboard/counters/shared/counter';
import { CounterService } from '../../../../../dashboard/counters/shared/counter.service';

@Component({
  selector: 'counter-edit',
  template: `
  <li>
    <span type="button" class="btn btn-xs">
        <input type='checkbox' id='{{counter.title}}' [checked]="info" (change)="info = !info" class='tags-checkbox sr-only'/>
        <label for='{{counter.title}}'>
            <i class="fa fa-toggle-off" aria-hidden="true" (click)='updateActive(true)'></i>
            <i class="fa fa-toggle-on" aria-hidden="true" (click)='updateActive(false)'></i>
            <span class='label-content'>{{counter.title}}</span>
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
export class CounterEditComponent implements OnInit {
  id: any;
  title: string;
  info: boolean = false;
  @Input() counter: Counter;

  constructor(private route: ActivatedRoute, private db: AngularFireDatabase, private counterSvc: CounterService) {
    this.title = this.route.snapshot.params.id;
  }

  ngOnInit() {
    // this.vanities.subscribe(() => this.showSpinner = false);
    this.info = this.infoBoo;
  }

  get infoBoo(): boolean {
    const ref = `counters/${this.counter.$key}/vanities/${this.title}`;
    this.db.object(ref).subscribe(obj => {
      return (this.info = obj.$exists());
    });
    // console.log(this.info);
    return this.info;
  }

  updateActive(value: boolean) {
    if (value === true) {
      this.counterSvc.updateCounterAv(this.counter.$key, this.title);
    } else {
      this.counterSvc.delCounterAv(this.counter.$key, this.title);
    }
  }
}
