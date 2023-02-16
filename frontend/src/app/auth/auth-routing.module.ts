import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../public/login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full'},

  {path : 'login', component: LoginComponent, data: { title: 'Login' }},
  {path : 'logout', component: LogoutComponent, data: { title: 'Logout' }},
  {path : 'register', component: RegisterComponent, data: { title: 'Register' }},
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
