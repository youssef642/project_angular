import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ProductDetailsComponent } from './features/product-details/product-details.component';
import { CartComponent } from './features/cart/cart.component';
import { FavoritesComponent } from './features/favorites/favorites.component';
import { CheckoutComponent } from './features/checkout/checkout.component';
// import { LoginComponent } from './features/auth/login/login.component';
// import { RegisterComponent } from './features/auth/register/register.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'checkout', component: CheckoutComponent, canActivate: [authGuard] },
  // { path: 'login', component: LoginComponent },
  // { path: 'register', component: RegisterComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }