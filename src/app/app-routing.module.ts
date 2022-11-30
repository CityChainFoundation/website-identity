import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { HomeComponent } from './home/home.component';
import { RegisterPaymentComponent } from './register/payment.component';
import { RegisterComponent } from './register/register.component';
import { RegisterSignComponent } from './register/sign.component';
import { RegisterVerifyComponent } from './register/verify.component';
import { RegistryComponent } from './registry/registry.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  // { path: 'counter', component: CounterComponent },
  // { path: 'fetch-data', component: FetchDataComponent },
  { path: 'registry', component: RegistryComponent },
  { path: 'view/:address', component: RegistryComponent },

  { path: 'register', component: RegisterComponent },
  { path: 'register/verify', component: RegisterVerifyComponent },
  { path: 'register/sign', component: RegisterSignComponent },
  { path: 'register/payment', component: RegisterPaymentComponent },
  { path: 'announcements', component: AnnouncementsComponent },
  { path: 'announcements/:number', component: AnnouncementsComponent },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
