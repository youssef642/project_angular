import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { HomeComponent } from './features/home/home.component';
import { ProductCardComponent } from './shared/components/product-card/product-card.component';
import { ProductDetailsComponent } from './features/product-details/product-details.component';
import { CartComponent } from './features/cart/cart.component';
import { FavoritesComponent } from './features/favorites/favorites.component';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { LoginComponent } from './features/auth/login/login/login.component';
import { RegisterComponent } from "./features/auth/register/register/register.component";
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
// import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';

// This file is no longer needed because AppComponent is standalone.
// You can delete this file.