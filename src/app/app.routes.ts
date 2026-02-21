import { Routes } from '@angular/router';
import { HomeComponent } from './features/components/home/home.component';
import { CartComponent } from './features/components/cart/cart.component';
import { ProductsComponent } from './features/components/products/products.component';
import { CategoriesComponent } from './features/components/categories/categories.component';
import { BrandsComponent } from './features/components/brands/brands.component';
import { RegisterComponent } from './core/components/auth/register/register.component';
import { LoginComponent } from './core/components/auth/login/login.component';
import { NotfoundComponent } from './features/components/notfound/notfound.component';
import { authGuard } from './core/guards/auth/auth-guard';
import { ForgetpasswordComponent } from './core/components/auth/forgetpassword/forgetpassword.component';
import { ProductdetailsComponent } from './features/components/productdetails/productdetails.component';
import { ShippingaddressComponent } from './features/components/shippingaddress/shippingaddress.component';
import { AllOrdersComponent } from './features/components/allorders/allorders.component';
import { WishlistComponent } from './core/features/wishlist/wishlist/wishlist.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, title: 'Home' },
  { path: 'shippingaddress/:id', component: ShippingaddressComponent, title: 'Shipping Address' },
  { path: 'allorders', component: AllOrdersComponent, title: 'All Orders' },
  { path: 'cart', canActivate: [authGuard], component: CartComponent, title: 'Cart' },
  { path: 'products', component: ProductsComponent, title: 'Products' },
  { path: 'productdetails/:id', component: ProductdetailsComponent, title: 'Product Details' },
  { path: 'forgetpassword', component: ForgetpasswordComponent, title: 'Forget Password' },
  { path: 'categories', component: CategoriesComponent, title: 'Categories' },
  { path: 'brands', component: BrandsComponent, title: 'Brands' },
  { path: 'wishlist', component: WishlistComponent, title: 'Wishlist' },
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'register', component: RegisterComponent, title: 'Register' },
  { path: '**', component: NotfoundComponent, title: 'Not Found' },
];
