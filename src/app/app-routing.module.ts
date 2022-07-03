import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StarshipsComponent } from './starships/starships.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

const routes: Routes = [
  { path: '', component: WelcomePageComponent },
  { path: 'starships', component: StarshipsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
