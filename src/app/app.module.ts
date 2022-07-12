import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StarshipsComponent } from './starships/starships.component';

import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { InfoPageComponent } from './info-page/info-page.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupModalComponent } from './signup-modal/signup-modal.component';
import { ModalModule } from 'ngb-modal';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PilotCardComponent } from './pilot-card/pilot-card.component';
import { SigninModalComponent } from './signin-modal/signin-modal.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SigninPasswordModalComponent } from './signin-password-modal/signin-password-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    StarshipsComponent,
    HeaderComponent,
    InfoPageComponent,
    WelcomePageComponent,
    SignupModalComponent,
    PilotCardComponent,
    SigninModalComponent,
    SigninPasswordModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
