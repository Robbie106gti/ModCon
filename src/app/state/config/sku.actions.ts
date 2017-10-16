import { Action } from '@ngrx/store';
import { Sku } from './sku.model';

export const GET_SKU           = 'Sku get';
export const GET_SKU_SUCCESS   = 'Sku get success';

export const ADDCABINET        = '[Sku] Edit';
export const ADDMATERIAL       = '[Sku] Edit Material';
export const ADDCOUNTER        = '[Sku] Edit Counter';
export const ADDCOUNTERCOLOR   = '[Sku] Edit CounterColor';
export const ADDPANTRY         = '[Sku] Edit Pantry';
export const ADDACCESSORY      = '[Sku] Edit Accessory';
export const REMOVEACCESSORY   = '[Sku] Remove Accessory';
export const RESET             = '[Sku] Reset';


export class GetSku implements Action {
  readonly type = GET_SKU;
}

export class GetSkuSuccess implements Action {
  readonly type = GET_SKU_SUCCESS;
  constructor(public payload: Sku) {}
}

export class AddCabinet implements Action {
  readonly type = ADDCABINET;
  /// user a constructor to send a payload with the action
  constructor(public payload: any = null) { }
}

export class AddMaterial implements Action {
  readonly type = ADDMATERIAL;
  /// user a constructor to send a payload with the action
  constructor(public payload: any = null) { }
}

export class AddCounter implements Action {
  readonly type = ADDCOUNTER;
  /// user a constructor to send a payload with the action
  constructor(public payload: any = null) { }
}

export class AddCounterColor implements Action {
  readonly type = ADDCOUNTERCOLOR;
  /// user a constructor to send a payload with the action
  constructor(public payload: any = null) { }
}

export class AddPantry implements Action {
  readonly type = ADDPANTRY;
  /// user a constructor to send a payload with the action
  constructor(public payload: any = null) { }
}

export class AddAccessory implements Action {
  readonly type = ADDACCESSORY;
  /// user a constructor to send a payload with the action
  constructor(public payload: any = null) { }
}

export class RemoveAccessory implements Action {
  readonly type = REMOVEACCESSORY;
  /// user a constructor to send a payload with the action
  constructor(public payload: any = null) { }
}

export class Reset implements Action {
  readonly type = RESET;
}
export type All
  = GetSku
  | GetSkuSuccess
  | AddCabinet
  | AddMaterial
  | AddCounter
  | AddPantry
  | AddAccessory
  | RemoveAccessory
  | Reset;
