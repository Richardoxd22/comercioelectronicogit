import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BrandComponent } from './components/brand/brand.component';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { DefaultErrorComponent } from './components/default-error/default-error.component';
import { LoginComponent } from './components/login/login.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductComponent } from './components/product/product.component';
import { ProductTypeComponent } from './components/product-type/product-type.component';
import { DeliverymodeComponent } from './components/deliverymode/deliverymode.component';

const routes:Routes=[
  {path:'',component:HomeComponent},
  {path:'brand',component:BrandComponent},
  {path:'product',component:ProductComponent},
  {path:'product-type',component:ProductTypeComponent},
  {path:'cart',component:CartComponent},
  {path:'deliverymode',component:DeliverymodeComponent},
  {path:'login',component:LoginComponent},
  {path:'non-found', component:DefaultErrorComponent}
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule { }
