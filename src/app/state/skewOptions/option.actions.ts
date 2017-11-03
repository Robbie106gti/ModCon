import { Action } from '@ngrx/store';
import { Option } from './option.model';

export const GET_OPTION           = 'Option get';
export const GET_OPTION_SUCCESS   = 'Option get success';

export const RESET             = 'Option Reset';

export class GetOption implements Action {
  readonly type = GET_OPTION;
  constructor(public payload?: any) {}
}

export class GetOptionSuccess implements Action {
  readonly type = GET_OPTION_SUCCESS;
  constructor(public payload: Option) {}
}

export class Reset implements Action {
    readonly type = RESET;
  }
  export type All
= GetOption
| GetOptionSuccess;
