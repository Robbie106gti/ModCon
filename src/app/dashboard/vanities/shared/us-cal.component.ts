import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'us-dollar',
  template: `
<span>USD {{ usdollar | number:'2.2-2'}} <br>@ {{con | number:'1.2-2'}} </span>
  `
})

export class UsDollarComponent implements OnInit {
  @Input()  con: number;
  @Input()  can: number;
  usdollar: number;

  constructor(
      ) { }

  ngOnInit() {
      this.usdollar = this.can * this.con;
   }
}
