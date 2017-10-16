import { Component, OnInit } from '@angular/core';
import { SpinnerService } from './spinner.service';

@Component({
  selector: 'loading-spinner',
  templateUrl: './loading-spinner.component.html'
})
export class LoadingSpinnerComponent implements OnInit {
  spinner: string;

  constructor(private spinnerSvr: SpinnerService) { }

  ngOnInit() {
    this.spinnerSvr.currentSpinner.subscribe(spinner => this.spinner = spinner);
  }

}
