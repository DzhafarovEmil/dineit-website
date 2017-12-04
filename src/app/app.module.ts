import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FoodsComponent } from './foods/foods.component';
import {HoverDirective} from './hover.directive';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import {RouterModule} from '@angular/router';
import { RegisterComponent } from './register/register.component';
import {AuthGuard} from './auth.guard';
import {AuthenticationService} from './services/authentication.service';
import {FoodCompanyService} from './services/food.company.service';
import {FoodComponent} from './food/food.component';
import {FoodService} from './services/food.service';
import { OrdersComponent } from './orders/orders.component';
import { OrderComponent } from './order/order.component';
import {OrderService} from './services/order.service';
import { SettingsComponent } from './settings/settings.component';
import { SocialNetworkComponent } from './social-network/social-network.component';

const routes = [
  {path: '', component: FoodsComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
  {path: 'orders', component: OrdersComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    FoodsComponent,
    HoverDirective,
    LoginComponent,
    RegisterComponent,
    FoodComponent,
    OrdersComponent,
    OrderComponent,
    SettingsComponent,
    SocialNetworkComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    FoodService,
    FoodCompanyService,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
