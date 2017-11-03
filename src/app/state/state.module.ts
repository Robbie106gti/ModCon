import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// *************************
// Custom Application imports
// *************************

import { skuReducer } from './config/sku.reducer';
import { userReducer } from './user/user.reducer';
import { sumReducer } from './sum/sum.reducer';
import { optionReducer } from './skewOptions/option.reducer';
import { accessReducer } from './accessories/access.reducer';
import { countersReducer } from './counters/counters.reducer';

import { SkuFacade } from './config/sku.facade';
import { UserFacade } from './user/user.facade';
import { SumFacade } from './sum/sum.facade';
import { OptionFacade } from './skewOptions/option.facade';
import { AccessFacade } from './accessories/access.facade';
import { CountersFacade } from './counters/counters.facade';

import { environment } from '../../environments/environment';

export const firebaseConfig = environment.firebaseConfig;

@NgModule({
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,

    EffectsModule.forRoot([
      UserFacade,
      SkuFacade,
      SumFacade,
      OptionFacade,
      AccessFacade,
      CountersFacade
    ]),

    // Signature matches AppState interface
    StoreModule.forRoot({
      sku: skuReducer,
      sum: sumReducer,
      user: userReducer,
      options: optionReducer,
      access: accessReducer,
      counters: countersReducer
    }),

    StoreDevtoolsModule.instrument({ maxAge: 25 })
  ],
  providers: [
      UserFacade,
      SkuFacade,
      SumFacade,
      OptionFacade,
      AccessFacade,
      CountersFacade
  ],
})
export class AppStateModule { }
