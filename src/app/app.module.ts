import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';
import { metaReducers, reducers } from './store/reducers';
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';
import { PortsEffects } from './store/effects/ports.effects';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([PortsEffects]),
    StoreDevtoolsModule.instrument({
      name: 'Expero Ports Map App',
      logOnly: environment.production
    })
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
  declarations: []
})
export class AppModule {}
