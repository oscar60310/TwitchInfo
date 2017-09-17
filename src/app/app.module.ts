import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { TwitchService } from './service/twitch.service';
import { ShowComponent } from './show/show.component';

@NgModule({
  declarations: [
    AppComponent,
    ShowComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    routing,

  ],
  providers: [TwitchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
