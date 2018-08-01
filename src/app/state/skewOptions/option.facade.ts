import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import { AngularFireDatabase } from 'angularfire2/database-deprecated';

import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { AppState } from '../state';
import { Option } from './option.model';
import * as optionActions from './option.actions';
import { OptionQuery } from './option.reducer';

type Action = optionActions.All;

@Injectable()
export class OptionFacade {
  // ************************************************
  // Observable Queries available for consumption by views
  // ************************************************

  option$ = this.store.select(OptionQuery.getOption);

  // ************************************************
  // Effects to be registered at the Module level
  // ************************************************

  @Effect()
  getOption$: Observable<Action> = this.actions$.ofType(optionActions.GET_OPTION).pipe(
    map((action: optionActions.GetOption) => action.payload),
    mergeMap(() => this.db.object(`/options`)),
    map(option => new optionActions.GetOptionSuccess(option))
  );

  // ************************************************
  // Internal Code
  // ************************************************

  constructor(private actions$: Actions, private store: Store<AppState>, private db: AngularFireDatabase) {}

  loadOption(): Observable<Option> {
    this.store.dispatch(new optionActions.GetOption());
    return this.option$;
  }
}
