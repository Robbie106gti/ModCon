import { Action } from '@ngrx/store';
import { Access } from './access.model';

export const GET_ACCESS           = 'Access get';
export const GET_ACCESS_SUCCESS   = 'Access get success';

export const RESET             = 'Access Reset';

export class GetAccess implements Action {
  readonly type = GET_ACCESS;
  constructor(public payload?: any) {}
}

export class GetAccessSuccess implements Action {
  readonly type = GET_ACCESS_SUCCESS;
  constructor(public payload: Access) {}
}

export class Reset implements Action {
    readonly type = RESET;
  }
  export type All
= GetAccess
| GetAccessSuccess;
