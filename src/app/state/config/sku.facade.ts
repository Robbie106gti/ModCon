import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import { AngularFireDatabase } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import '../../utils/rxjs.operators';

import { AppState } from '../state';
import { Sku } from './sku.model';
import { SkuQuery } from './sku.reducer';

import * as skuActions from './sku.actions';
type Action = skuActions.All;


@Injectable()
export class SkuFacade {

  // ************************************************
  // Observable Queries available for consumption by views
  // ************************************************

  sku$ = this.store.select(SkuQuery.getSku);

  // ************************************************
  // Effects to be registered at the Module level
  // ************************************************
/*   @Effect()
  init$: Observable<Action> = this.actions$.ofType(AUTHENTICATED)
      .map(_ => new postActions.GetPost('/posts/testPost')); */


/*   @Effect()
   getSku$: Observable<Action> = this.actions$
     .ofType(skuActions.GET_SKU)
     .map(sku => {
       return new skuActions.GetSkuSuccess(sku);
     }); */


/*   @Effect()
   getSku$: Observable<Action> = this.actions$.ofType(skuActions.GET_SKU)
     .map((action: skuActions.GetSku) => action.payload )
     .delay(2000) // delay to show spinner
     .mergeMap(payload => this.db.object(payload))
     .map(post => {
       post.pushKey = post.$key;
       return new skuActions.GetSkuSuccess(post);
     }); */

/*
   @Effect()
   voteUpdate: Observable<Action> = this.actions$.ofType(skuActions.VOTE_UPDATE)
     .map((action: skuActions.VoteUpdate) => action.payload )
     .mergeMap(payload => of(this.db.object('posts/' + payload.post.pushKey)
                          .update({
                            votes: payload.post.votes + payload.val
                          })))

     .map(() => new postActions.VoteSuccess())
     .catch(err => of (new postActions.VoteFail( { error: err.message } )) ); */

  // ************************************************
  // Internal Code
  // ************************************************

  constructor(
      private actions$: Actions,
      private store: Store<AppState>,
      private db: AngularFireDatabase
  ) { }


/*    loadSku(): Observable<Sku> {
    this.store.dispatch(new skuActions.GetSku());
    return this.sku$;
  } */

/*
  vote(post: Post, val: number): void {
    this.store.dispatch(new postActions.VoteUpdate({ post, val }));
  } */

}
