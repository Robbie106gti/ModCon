import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DemoService } from './demo.service';
import { FirebaseObjectObservable } from 'angularfire2/database';
import { Pantry } from '../../dashboard/pantries/shared/pantry';
import { Color } from '../../dashboard/materials/shared/material';
import * as _ from 'lodash';

@Component({
  selector: 'demo',
  template: `
    <div class="jumbotron" *ngIf="access | async as a">
      <div class="thumbnail wrapper">
        <div class="image">
          <img src="{{ a.images['mainImg'].url }}" alt="{{ a.images['mainImg'].name }}">
        </div>
        <div class="caption ">
          <h3>{{ a.title }}</h3>
          <hr>
          <p>Options:</p>
          <ul>
            <li *ngFor="let o of options">{{ o.title }} - {{ o.description }}</li>
          </ul>
          <p>Possible on SKU:</p>
          <small><span *ngFor="let sku of skews"><a routerLink="../../vanities/{{sku.line}}/{{sku.key}}/options/accessories">{{ sku.key }}</a>, </span>
          <span> and <a routerLink="../../vanities/{{last.line}}/{{last.key}}/options/accessories">{{ last.key }}</a></span></small>
          <p>Status:
            <i *ngIf="a.active === true" class="fa fa-toggle-on" aria-hidden="true"></i>
            <i *ngIf="a.active === false" class="fa fa-toggle-off" aria-hidden="true"></i>
          </p>
        </div>
      </div>
    </div>

    <div class="jumbotron" *ngIf="mat | async as m">
      <div class="thumbnail wrapper">
        <div>
          <img class="image" src="{{ m.color.url }}" alt="{{ m.color.name }}">
        </div>
        <div class="caption ">
          <h3>{{ m.material }} - {{ m.title }}</h3>
          <hr>
          <p>Possible on Lines:</p>
          <ul>
            <li *ngFor="let arr of array"><a routerLink="../../../vanities/{{arr.key}}">
            {{ arr.key }}
            <i *ngIf="arr.value === true" class="fa fa-toggle-on" aria-hidden="true"></i>
            <i *ngIf="arr.value === false" class="fa fa-toggle-off" aria-hidden="true"></i></a>
            </li>
          </ul>
          <p>Status:
            <i *ngIf="m.active === true" class="fa fa-toggle-on" aria-hidden="true"></i>
            <i *ngIf="m.active === false" class="fa fa-toggle-off" aria-hidden="true"></i>
          </p>
        </div>
      </div>
    </div>

    <div class="jumbotron" *ngIf="pantry | async as p">
      <div class="thumbnail wrapper">
        <div>
          <img class="image" src="{{ p.images['mainImg'].url }}" alt="{{ p.images['mainImg'].name }}">
        </div>
        <div class="caption ">
          <h3>{{ p.title }}</h3>
          <hr>
          <p>Possible in Line:</p><a routerLink="../../../vanities/{{ obj['1'].path }}">
          <small><span>{{ obj['1'].path }} </span></small></a>
          <p>Status:
            <i *ngIf="p.active === true" class="fa fa-toggle-on" aria-hidden="true"></i>
            <i *ngIf="p.active === false" class="fa fa-toggle-off" aria-hidden="true"></i>
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [`
  .wrapper {
    display: grid;
    grid-gap: 1rem;
    grid-auto-rows: minmax(100px, auto);
    grid-template-columns: repeat(2, 1fr);
  }
  .image {
    position:relative;    
    display: inline-block;
    max-height: 70vh;
    max-width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  img {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    position:absolute;
    top:0;
    bottom:0;
    margin:auto;
    margin-left: auto;
    margin-right: auto;
  }
  `]
})
export class DemoComponent implements OnInit {
  title: string;
  obj: any;
  material = [ 'Paint', 'Wood', 'Textured Melamine', 'Euro Materials' ];
  lines = [ 'Porto', 'Maine', 'Maritime', 'Pacific', 'Pacific Floating'];
  access: FirebaseObjectObservable<any>;
  pantry: FirebaseObjectObservable<Pantry>;
  mat: FirebaseObjectObservable<Color>;
  options: any;
  skews: any;
  array: any;
  last: string;
  line = [
    { 'key': 'PA', 'title': 'Pacific'},
    { 'key': 'PAF', 'title': 'Pacific Floating'},
    { 'key': 'MA', 'title': 'Maine'},
    { 'key': 'MT', 'title': 'Maritime'},
    { 'key': 'PO', 'title': 'Porto' }
  ];

  constructor(
    private route: ActivatedRoute,
    private demo: DemoService
  ) { }

  ngOnInit() {
    this.obj = this.route.snapshot.url;
    // console.log(this.obj);
    if (this.obj.length === 3) {
      // console.log('I am 3');
      this.getDemoObj3();
    }
    if (this.obj.length === 2) {
      // console.log('I am 2');
      this.access = this.demo.getAccessory(this.obj);
      this.access.take(1).subscribe( access => {
        this.options = _.toArray(access.options);
        let data = access.skews;
        let result = Object.keys(data).map(key => ({ key, value: data[key], line: this.getLine(key) }));
        // console.log(result);
        // console.log(this.line);
        this.last = _.last(result);
        this.skews = _.pull(result, this.last);
      });
    }
  }

  getDemoObj3() {
    if (this.material.includes(this.obj['1'].path)) {
      // console.log('I am a material');
      this.mat = this.demo.getMaterial(this.obj);
      this.mat.take(1).subscribe(mat => {
        let data = mat.vanities;
        let result = Object.keys(data).map(key => ({ key, value: data[key] }));
        this.array = result;
      });
    }
    if (this.lines.includes(this.obj['1'].path)) {
      // console.log('I am a pantry');
      this.pantry = this.demo.getPantry(this.obj);
    }
  }

  getLine(key) {
    let str = key.slice(0, 3);
    let withNoDigits = str.replace(/[0-9]/g, '');
    // console.log(withNoDigits);
    let id = _.findIndex(this.line, { 'key': withNoDigits });
    // console.log(id);
    return this.line[id].title;
  }
}
