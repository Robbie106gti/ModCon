import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import { AngularFireDatabase } from 'angularfire2/database-deprecated';

import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { AppState } from '../state';
import { Access } from './access.model';
import * as accessActions from './access.actions';
import { AccessQuery } from './access.reducer';

type Action = accessActions.All;

@Injectable()
export class AccessFacade {
  // ************************************************
  // Observable Queries available for consumption by views
  // ************************************************

  access$ = this.store.select(AccessQuery.getAccess);

  // ************************************************
  // Effects to be registered at the Module level
  // ************************************************

  @Effect()
  getAccess$: Observable<Action> = this.actions$.ofType(accessActions.GET_ACCESS).pipe(
    map((action: accessActions.GetAccess) => action.payload),
    mergeMap(() => this.db.object(`/accessories`)),
    map(access => {
      return new accessActions.GetAccessSuccess(access);
    })
  );

  // ************************************************
  // Internal Code
  // ************************************************

  constructor(private actions$: Actions, private store: Store<AppState>, private db: AngularFireDatabase) {}

  loadAccess(): Observable<Access> {
    this.store.dispatch(new accessActions.GetAccess());
    return this.access$;
  }
}
