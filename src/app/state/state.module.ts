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

import { SkuFacade } from './config/sku.facade';
import { UserFacade } from './user/user.facade';
import { SumFacade } from './sum/sum.facade';

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
      SumFacade
    ]),

    // Signature matches AppState interface
    StoreModule.forRoot({
      sku: skuReducer,
      sum: sumReducer,
      user: userReducer
    }),

    StoreDevtoolsModule.instrument({ maxAge: 25 })
  ],
  providers: [
      UserFacade,
      SkuFacade,
      SumFacade
  ],
})
export class AppStateModule { }
