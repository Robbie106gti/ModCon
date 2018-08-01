import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Sink } from '../../../../sinks/shared/sink';
import { Top } from '../../../../tops/shared/top';
import { SinksService } from '../../../../sinks/shared/sink.service';

@Component({
  selector: 'sinks-edit',
  template: `
  <li><span type="button" class="btn btn-xs">
    <input type='checkbox' id='{{sink.title}}' [checked]="info" (change)="info = !info" class='tags-checkbox sr-only'/>
    <label for='{{sink.title}}'>
        <i class="fa fa-toggle-off" aria-hidden="true" (click)='updateActive(true)'></i>
        <i class="fa fa-toggle-on" aria-hidden="true" (click)='updateActive(false)'></i>
      <span class='label-content'>{{sink.title}}</span>
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
export class SinkEditComponent implements OnInit {
  id: any;
  title: string;
  @Input() sink: Sink;
  @Input() top: Top;
  info: boolean = false;

  constructor(private route: ActivatedRoute, private sinkSvc: SinksService) {
    this.title = this.route.snapshot.params.id;
  }

  ngOnInit() {
    // this.vanities.subscribe(() => this.showSpinner = false);
    this.info = this.sinkInfo;
  }

  get sinkInfo(): boolean {
    if (this.top.sink === this.sink.$key) {
      this.info = true;
    } else {
      this.info = false;
    }
    // console.log(this.info);
    return this.info;
  }

  updateActive(value: boolean) {
    if (value === true) {
      this.sinkSvc.updateSink(this.sink.$key, this.top.$key);
    } else {
      this.sinkSvc.delSink(this.sink.$key, this.top.$key);
    }
  }
}
