import { Component } from '@angular/core';
import { AppState } from '../../state/state';
import { Store } from '@ngrx/store';
import { User } from '../../state/user/user.model';
import { Observable } from 'rxjs/Observable';
import * as SumActions from '../../state/sum/sum.actions';
import * as OptionActions from '../../state/skewOptions/option.actions';
import * as AccessActions from '../../state/accessories/access.actions';
import * as CountersActions from '../../state/counters/counters.actions';

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
    this.user$.subscribe(user => {
      if (user.zone === 'admin') {
        this.store.dispatch(new OptionActions.GetOption());
        this.store.dispatch(new AccessActions.GetAccess());
        this.store.dispatch(new CountersActions.GetCounters());
      }
    });
  }
}
