import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerService } from '../ui/loading-spinner/spinner.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private spinner: SpinnerService
    ) { }

  ngOnInit() {
    this.spinner.changeSpinner('true');
  }

}
