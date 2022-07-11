import { SigninModalComponent } from './signin-modal/signin-modal.component';
import { NgModule, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StarshipsComponent } from './starships/starships.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { InfoPageComponent } from './info-page/info-page.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', component: WelcomePageComponent },
  { path: 'login', component: SigninModalComponent },
  {
    path: 'starships',
    component: StarshipsComponent,
    canActivate: [AuthGuard],
    data: { animation: 'isRight' },
  },
  {
    path: 'starships/info',
    component: InfoPageComponent,
    data: { animation: 'isLeft' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
