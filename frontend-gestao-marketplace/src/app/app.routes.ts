import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Layout } from './pages/layout/layout';
import { Products } from './pages/products/products';
import { NewProduct } from './pages/new-product/new-product';
import { authGuard } from './guards/auth-guard';
import { Register } from './pages/register/register';

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'register',
    component: Register,
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: Layout,
    canActivateChild: [authGuard],
    children: [
      {
        path: 'products',
        component: Products,
      },
      {
        path: 'new-product',
        component: NewProduct,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/login',
  },
];
