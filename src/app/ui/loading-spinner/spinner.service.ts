import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SpinnerService {
  private spinner = new BehaviorSubject<string>('');
  currentSpinner = this.spinner.asObservable();

  constructor() {}

  changeSpinner(spinner: string) {
    this.spinner.next(spinner);
  }
}
