import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ProductsComponent } from './products/products.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { ContactComponent } from './contact/contact.component';
import { CareerComponent } from './career/career.component';
import { TeamWorkComponent } from './team-work/team-work.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ApproveComponent } from './approve/approve.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutUsComponent,
    ProductsComponent,
    PromotionsComponent,
    ContactComponent,
    CareerComponent,
    TeamWorkComponent,
    LoginComponent,
    SignupComponent,
    ApproveComponent,
    ProductdetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
