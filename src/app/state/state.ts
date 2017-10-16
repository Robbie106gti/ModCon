import { Sku } from './config/sku.model';
import { Sum } from './sum/sum.model';
import { User } from './user/user.model';

export interface AppState {
    sku: Sku;
    sum: Sum;
    user: User;
  }
