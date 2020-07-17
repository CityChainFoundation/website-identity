import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { AboutComponent } from './about/about.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { RegistryComponent } from './registry/registry.component';
import { RegisterComponent } from './register/register.component';
import { RegisterVerifyComponent } from './register/verify.component';
import { RegisterPaymentComponent } from './register/payment.component';
import { RegisterSignComponent } from './register/sign.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    FetchDataComponent,
    AboutComponent,
    AnnouncementsComponent,
    RegistryComponent,
    RegisterComponent,
    RegisterVerifyComponent,
    RegisterSignComponent,
    RegisterPaymentComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      // { path: 'counter', component: CounterComponent },
      // { path: 'fetch-data', component: FetchDataComponent },
      { path: 'registry', component: RegistryComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'register/verify', component: RegisterVerifyComponent },
      { path: 'register/sign', component: RegisterSignComponent },
      { path: 'register/payment', component: RegisterPaymentComponent },
      { path: 'announcements', component: AnnouncementsComponent },
      { path: 'announcements/:number', component: AnnouncementsComponent },
      { path: 'about', component: AboutComponent },
    ], { onSameUrlNavigation: 'reload' })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
