import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StarshipsComponent } from './starships/starships.component';

import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { InfoPageComponent } from './info-page/info-page.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

@NgModule({
  declarations: [AppComponent, StarshipsComponent, HeaderComponent, InfoPageComponent, WelcomePageComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
