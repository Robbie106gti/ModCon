import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Access, Option } from './shared/access';
import { AccessService } from './shared/access.service';
import { FlashMessagesService } from 'angular2-flash-messages/module';

@Component({
  selector: 'access-option',
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '(document:mousedown)': 'onClick($event)'
  },
  template: `
    <li>
      <span *ngIf="!edittitle" (click)="setTitle()">{{option.title || 'title'}} - </span>
      <span *ngIf="!editdescription" (click)="setDesc()">{{ option.description || 'none'}}</span>
    </li>
    <li>
      Price: <span *ngIf="!editprice" (click)="setPrice()">CAN $ {{ option.price || '0.00' | number:'2.2-2'}}</span>
      <span type="button" class="btn btn-danger btn-xs" (click)='deleteItem()'><i class="fa fa-trash-o" aria-hidden="true"></i></span>
    </li>
    <form class="form-group">
      <li *ngIf="edittitle" >
        <input #ttitle name="text" (keyup.enter)="editTitle(ttitle.value)" class="form-control"
        [(ngModel)]="option.title" placeholder="Title" type="text"/>
      </li>
      <li *ngIf="editdescription" >
        <input #body name="text" (keyup.enter)="editDesc(body.value)" class="form-control"
        [(ngModel)]="option.description" placeholder="Description" type="text"/>
      </li>
      <li *ngIf="editprice" >
        <input #pprice name="text" (keyup.enter)="editPrice(pprice.value)" class="form-control"
        [(ngModel)]="option.price" placeholder="0.00" type="text"/>
      </li>
    </form>
  `
})
export class OptionAccessComponent implements OnInit {
  @Input() access: Access;
  @Input() option: Option;
  edittitle: boolean;
  editdescription: boolean;
  editprice: boolean;

  constructor(private accessSvc: AccessService, private _eref: ElementRef, public flashMessage: FlashMessagesService) {}

  ngOnInit() {}

  onClick(event) {
    if (!this._eref.nativeElement.contains(event.target)) {
      this.edittitle = null;
      this.editdescription = null;
      this.editprice = null;
    }
  }

  setTitle() {
    return (this.edittitle = true);
  }
  setDesc() {
    return (this.editdescription = true);
  }
  setPrice() {
    return (this.editprice = true);
  }

  editTitle(value): Option {
    const obj = { title: value };
    this.accessSvc.updateOptions(this.access.$key, this.option.$key, obj);
    this.flashMessage.show(
      'Updating title to ' + value + ' for item ' + this.access.title + ' - ' + this.option.title,
      { cssClass: 'alert-info', timeout: 3000 }
    );
    return (this.edittitle = null);
  }

  editDesc(value) {
    const obj = { description: value };
    this.accessSvc.updateOptions(this.access.$key, this.option.$key, obj);
    this.flashMessage.show(
      'Updating description to ' + value + ' for item ' + this.access.title + ' - ' + this.option.title,
      { cssClass: 'alert-info', timeout: 3000 }
    );
    return (this.editdescription = null);
  }

  editPrice(value) {
    const obj = { price: value };
    this.accessSvc.updateOptions(this.access.$key, this.option.$key, obj);
    this.flashMessage.show(
      'Updating price to ' + value + ' for item ' + this.access.title + ' - ' + this.option.title,
      { cssClass: 'alert-info', timeout: 3000 }
    );
    return (this.editprice = null);
  }

  deleteItem() {
    this.flashMessage.show('Deleting option to ' + this.option.title + ' - ' + this.option.title, {
      cssClass: 'alert-info',
      timeout: 3000
    });
    this.accessSvc.delOption(this.access.$key, this.option.$key);
  }
}
