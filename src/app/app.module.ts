import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { TwitchService } from './service/twitch.service';
import { WeatherService } from './service/weather.service';
import { ShowComponent } from './show/show.component';

@NgModule({
  declarations: [
    AppComponent,
    ShowComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    routing,

  ],
  providers: [TwitchService, WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
