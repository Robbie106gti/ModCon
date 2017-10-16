import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { List, Featurette } from '../../ui/featurette/featurette';
import { HomeService } from '../shared/home.service';

@Component({
selector: 'featurette-point',
// tslint:disable-next-line:use-host-property-decorator
host: {
    '(document:mousedown)': 'onClick($event)',
},
  template: `
    <li class="list" *ngIf="!toggle; else edit" >
        <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
        <span (click)="setToggle()">{{list.text}}</span>
        <button type="button" class="btn btn-danger btn-xs" (click)="remove()">
         <i class="fa fa-times-circle" aria-hidden="true"></i>
       </button>
    </li>

<ng-template #edit>
    <form class="form-group">
        <input #text name="text" (keyup.enter)="updateText(text.value)" class="form-control" [(ngModel)]="list.text" type="text"/>
    </form>
</ng-template>
`,
styles: [`
.btn, .fa {
    display: none;
}
.list:hover .btn, .list:hover .fa {
    display: inline;
}
`]
})
export class FeaturettePointComponent {
    toggle: boolean;
    @Input() list: List;
    @Input() featurette: Featurette;

  constructor(
  private home: HomeService,
  private _eref: ElementRef
  ) { }

setToggle() {
    return this.toggle = true;
}

onClick(event) {
    if (!this._eref.nativeElement.contains(event.target)) {
        this.toggle = null;
    }
}

updateText(value: string) {
    let key = this.list.$key;
    let feat = this.featurette.$key;
    let val = {'text': value};
    this.toggle = null;
    this.home.updateLiItem(feat, key, val);
}

remove() {
    let value = this.list.$key;
    let key = this.featurette.$key;
    this.home.deleteLiItem(key, value);
}
}
