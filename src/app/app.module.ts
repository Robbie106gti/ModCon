import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlashMessagesModule } from 'angular2-flash-messages';

///// Start FireStarter
import { environment } from '../environments/environment';
import * as firebase from 'firebase/app';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule} from 'angularfire2/auth';
export const firebaseConfig = environment.firebaseConfig;

///// Services
import { AuthService } from './users/auth/auth.service';
import { AuthGuard} from './users/auth/auth.guard';
import { VanityService} from './dashboard/vanities/shared/vanity.service';
import { ItemService } from './items/shared/item.service';
import { UploadService } from './uploads/shared/upload.service';
import { MatService } from './dashboard/materials/shared/materials.service';
import { CounterService } from './dashboard/counters/shared/counter.service';
import { TopsService } from './dashboard/tops/shared/top.service';
import { SinksService } from './dashboard/sinks/shared/sink.service';
import { AccessService } from './dashboard/access/shared/access.service';
import { ConfigsService } from './dashboard/configs/shared/config.service';
import { PantriesService } from './dashboard/pantries/shared/pantry.service';
import { ZoneService } from './users/shared/zone.service';
import { SharedService } from './home/shared/shared.service';
import { HomeService } from './dashboard/shared/home.service';
import { SpinnerService } from './ui/loading-spinner/spinner.service';

///// Base pages
import { RoutingModule } from './routing/routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found.component';

///// UI Components
import { FooterUiComponent } from './ui/footer/footer.component';
import { HeaderUiComponent } from './ui/header/header.component';
import { FeaturettesComponent } from './ui/featurette/featurettes.component';
import { FeaturetteComponent } from './ui/featurette/featurette.component';
import { LoadingSpinnerComponent } from './ui/loading-spinner/loading-spinner.component';

///// Components
import { CarouselModule } from './ui/carousel/carousel.module';
import { LoginComponent } from './users/login/login.component';
import { HomeComponent } from './home/home.component';
import { HomeModule } from './home/home.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { CarouselDemoComponent } from './home/carousel/carousel-demo.component';
import { NgTranscludeDirective } from './ui/common';
import { ModsService } from './home/vanities/vanity-view/skews/mods/mods.service';
import { ToastService } from './home/shared/toast.service';
import { ToastMessagesComponent } from './home/shared/toast-messages';
import { ReversePipe } from './reverse.pipe';
import { ToastMessageComponent } from './home/shared/toast-message.component';
import { OrderIdService } from './users/shared/order-id.service';
import { OrderService } from './home/vanities/vanity-view/skews/order/order.service';
import { MessagingService } from './users/shared/messaging.service';
import { AppStateModule } from './state/state.module';
import { FavoritesService } from './dashboard/favorites/favorites.service';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    LoginComponent,
    HomeComponent,
    FooterUiComponent,
    HeaderUiComponent,
    LoadingSpinnerComponent,
    FeaturettesComponent,
    FeaturetteComponent,
    CarouselDemoComponent,
    ToastMessagesComponent,
    ToastMessageComponent,
    NgTranscludeDirective,
    ReversePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppStateModule,
    CarouselModule,

    // BrowserAnimationsModule,
    FlashMessagesModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RoutingModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    ZoneService,
    VanityService,
    ItemService,
    UploadService,
    MatService,
    CounterService,
    TopsService,
    SinksService,
    AccessService,
    ConfigsService,
    PantriesService,
    SharedService,
    SpinnerService,
    ModsService,
    HomeService,
    ToastService,
    OrderIdService,
    OrderService,
    MessagingService,
    FavoritesService
    ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
