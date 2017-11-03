import { Sku } from './config/sku.model';
import { Sum } from './sum/sum.model';
import { User } from './user/user.model';
import { Option } from './skewOptions/option.model';
import { Access } from './accessories/access.model';
import { Counter } from './counters/counters.model';

export interface AppState {
    sku: Sku;
    sum: Sum;
    user: User;
    options: Option;
    access: Access;
    counters: Counter;
  }
