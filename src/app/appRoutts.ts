import { Routes } from '@angular/router';


import { HeaderComponent } from './header/header.component';
import { AccountComponent } from './account/account.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { WomensComponent } from './womens/womens.component';
import { MensComponent } from './mens/mens.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { CartListComponent } from './cart-list/cart-list.component';

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    // { path: 'header', component: HeaderComponent },
    // { path: 'footer', component: FooterComponent },
    { path: 'account', component: AccountComponent },
    { path: 'chechout', component: CheckoutComponent },
    { path: 'womens', component: WomensComponent },
    { path: 'mens', component: MensComponent },
    { path: 'cartlist', component: CartListComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];