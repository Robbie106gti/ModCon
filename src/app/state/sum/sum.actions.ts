import { Action } from '@ngrx/store';
import { Sum } from './sum.model';

export const GET_SUM           = 'Sum get';
export const GET_SUM_SUCCESS   = 'Sum get success';

export const RESET             = 'Sum Reset';

export class GetSum implements Action {
  readonly type = GET_SUM;
  constructor(public payload?: any) {}
}

export class GetSumSuccess implements Action {
  readonly type = GET_SUM_SUCCESS;
  constructor(public payload: Sum) {}
}

export class Reset implements Action {
    readonly type = RESET;
  }
  export type All
= GetSum
| GetSumSuccess;
