import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { ApproveComponent } from './approve/approve.component';
import { CareerComponent } from './career/career.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { SignupComponent } from './signup/signup.component';
import { TeamWorkComponent } from './team-work/team-work.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';

const routes: Routes = [
  { path: '',  redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'products', component: ProductsComponent},
  { path: 'promotions', component: PromotionsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'career', component: CareerComponent },
  { path: 'team-work', component: TeamWorkComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'approve', component: ApproveComponent },
  { path:'products/proditem/:id',component:ProductdetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload', scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
