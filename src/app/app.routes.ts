import { Routes } from '@angular/router';
import { EnterprisesComponent } from './views/enterprises/pages/enterprise.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

export const routes: Routes = [
  { path: 'home', component: EnterprisesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent}, 
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
