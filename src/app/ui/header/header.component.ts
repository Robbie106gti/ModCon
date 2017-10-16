import { Component } from '@angular/core';
import { AppState } from '../../state/state';
import { Store } from '@ngrx/store';
import { User } from '../../state/user/user.model';
import { Observable } from 'rxjs/Observable';
import * as SumActions from '../../state/sum/sum.actions';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderUiComponent {
  user$: Observable<User>;
  constructor(
    private store: Store<AppState>
    ) {
    this.user$ = this.store.select(state => state.user);
    this.store.dispatch(new SumActions.GetSum());
  }
}
