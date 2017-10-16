import { Numbers } from '../../../../shared/shared';

export interface Val {
    price: number;
    qnty?: number;
    line?: string;
    sku?: string;
    material?: string;
    color?: string;
    location?: string; // left right both
  }

  export interface ISum {
    type: string;
    currency: number;
    skew: Val;
    mat: Val;
    numberSub?: Numbers;
    top?: Val;
    pantry?: Val;
  }

  export class Sum implements ISum {
      type = 'usd';
      currency = 1;
      skew = { 'price': 1000, 'line': null, 'sku': null};
      mat = { 'price': 1, 'material': null, 'color': null};
      numberSub = {
        'paint': 1,
        'euro': null,
        'WalnutOak': null,
        'ncDiscount': null,
        'TM': null,
        'usd': null,
        'dealer1': null,
        'dealer2': null,
        'dealer3': null,
      };
      top = null;
      pantry = null;
      accessories = 0;
      total = 0;
  }
