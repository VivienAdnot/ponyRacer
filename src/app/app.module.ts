import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { RacesComponent } from './races/races.component';
import { RaceComponent } from './race/race.component';
import { PonyComponent } from './pony/pony.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';

import { RaceService } from './race.service';
import { UserService } from './user.service';
import { JwtInterceptorService } from './jwt-interceptor.service';
import { WsService } from './ws.service';
import * as Webstomp from 'webstomp-client';
import { WEBSOCKET, WEBSTOMP } from './app.tokens';

import { FromNowPipe } from './from-now.pipe';

import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import { LoginComponent } from './login/login.component';
import { BetComponent } from './bet/bet.component';
import { LiveComponent } from './live/live.component';

export function webSocketFactory() {
  return WebSocket;
}

export function webstompFactory() {
  return Webstomp;
}

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    RacesComponent,
    RaceComponent,
    PonyComponent,
    FromNowPipe,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    BetComponent,
    LiveComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
      RaceService,
      UserService,
      WsService,
      JwtInterceptorService,
      { provide: HTTP_INTERCEPTORS, useExisting: JwtInterceptorService, multi: true },
      { provide: WEBSOCKET, useFactory: webSocketFactory },
      { provide: WEBSTOMP, useFactory: webstompFactory }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
