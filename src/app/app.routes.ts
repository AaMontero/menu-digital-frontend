import { Routes } from '@angular/router';
import { EnterprisesComponent } from './views/enterprises/pages/enterprise.component';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
  { path: 'home', component: EnterprisesComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
