import { Component, OnInit } from '@angular/core';
import { SkewNew } from '../../../shared/vanity';
import { VanityService } from '../../../shared/vanity.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'skew-form',
  templateUrl: './skew-form.component.html',
  styleUrls: ['./skew-form.component.css']
})
export class SkewFormComponent implements OnInit {
  skew: SkewNew = new SkewNew();
  title: string;

  constructor(private vanitySvc: VanityService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.title = this.route.snapshot.params.id;
    // console.log(this.title);
  }

  createItem() {
    this.vanitySvc.updateSkew(this.skew.title, { title: this.skew.title });
    this.skew = new SkewNew(); // reset item
  }
}
