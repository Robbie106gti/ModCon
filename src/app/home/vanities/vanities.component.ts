import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerService } from '../../ui/loading-spinner/spinner.service';
import { ToastService } from '../shared/toast.service';

@Component({
  selector: 'vanities',
  templateUrl: './vanities.component.html'
})
export class VanitiesComponent implements OnInit {

  constructor(
    private spinner: SpinnerService,
    private toast: ToastService
  ) {
    this.spinner.changeSpinner('true');
    // this.infoMessage();
  }

  infoMessage() {
    const message = 'I have some useful information for you...';
    this.toast.sendMessage(message, 'info');
  }

  ngOnInit() {
  }

}
