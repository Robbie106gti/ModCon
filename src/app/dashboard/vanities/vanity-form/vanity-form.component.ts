import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VanityNew } from '../shared/vanity';
import { VanityService } from '../shared/vanity.service';

@Component({
  selector: 'vanity-form',
  templateUrl: './vanity-form.component.html'
})
export class VanityFormComponent implements OnInit {

  vanity: VanityNew = new VanityNew();
  title: string;

  constructor(private vanitySvc: VanityService) { }

  ngOnInit() {
  }

  createItem() {
    this.vanitySvc.updateItem(this.vanity.title, { title: this.vanity.title });
    this.vanity = new VanityNew(); // reset item
  }

}
