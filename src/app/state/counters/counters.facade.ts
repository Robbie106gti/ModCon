import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import { AngularFireDatabase } from 'angularfire2/database-deprecated';

import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { AppState } from '../state';
import { Counter } from './counters.model';
import * as countersActions from './counters.actions';
import { CountersQuery } from './counters.reducer';

type Action = countersActions.All;

@Injectable()
export class CountersFacade {
  // ************************************************
  // Observable Queries available for consumption by views
  // ************************************************

  counters$ = this.store.select(CountersQuery.getCounters);

  // ************************************************
  // Effects to be registered at the Module level
  // ************************************************

  @Effect()
  getCounters$: Observable<Action> = this.actions$.ofType(countersActions.GET_COUNTERS).pipe(
    map((action: countersActions.GetCounters) => action.payload),
    mergeMap(() => this.db.object(`/counter-tops`)),
    map(counters => new countersActions.GetCountersSuccess(counters))
  );

  // ************************************************
  // Internal Code
  // ************************************************

  constructor(private actions$: Actions, private store: Store<AppState>, private db: AngularFireDatabase) {}

  loadCounters(): Observable<Counter> {
    this.store.dispatch(new countersActions.GetCounters());
    return this.counters$;
  }
}
