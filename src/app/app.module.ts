import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {JwtModule} from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { BrandComponent } from './components/brand/brand.component';
import { ProductTypeComponent } from './components/product-type/product-type.component';
import { ProductComponent } from './components/product/product.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { TestComponent } from './components/test/test.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BASE_URL } from './models/constanst';
import { environment } from 'src/environments/environment';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { DefaultErrorComponent } from './components/default-error/default-error.component';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { LoginComponent } from './components/login/login.component';
import { CartComponent } from './components/cart/cart.component';
import { DeliverymodeComponent } from './components/deliverymode/deliverymode.component';

export function tokenGetter(){
  return localStorage.getItem("token")
}
@NgModule({
  declarations: [
    AppComponent,
    BrandComponent,
    ProductTypeComponent,
    ProductComponent,
    NavBarComponent,
    FooterComponent,
    TestComponent,
    HomeComponent,
    DefaultErrorComponent,
    LoginComponent,
    CartComponent,
    DeliverymodeComponent
  ],
  imports: [
    BrowserModule,       
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    
  ],
  providers: [
    {
      provide:BASE_URL, useValue:(environment.baseUrl.length > 0 ? environment.baseUrl : 'https://localhost:5000')
    },
    {
      provide:HTTP_INTERCEPTORS,useClass:JwtInterceptor,multi:true
    },
    {
      provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptor, multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
