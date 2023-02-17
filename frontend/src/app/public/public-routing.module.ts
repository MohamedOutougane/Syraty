import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PostsComponent } from './posts/posts.component';
import { OthersPostComponent } from './others-post/others-post.component';
import { PlayoutComponent } from './playout/playout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../_helpers/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent, data: { title: 'Home' }},
  { path: 'login', component: LoginComponent, data: { title: 'login' }},
  { path: 'register', component: RegisterComponent, data: { title: 'login' }},
  {
    path: '', component: PlayoutComponent, children : [
      // { path: '', redirectTo: 'home', pathMatch: 'full'},

      { path: 'othersPost', component: OthersPostComponent, data: { title: 'othersPost' }},
      

      { path: 'dashboard', component: DashboardComponent, data: { title: 'dashboard' },canActivate:[AuthGuard]},
      { path: 'posts', component: PostsComponent, data: { title: 'posts' }, canActivate:[AuthGuard]}, 
    ]
  },


];

//je veux envoyer une variable dans mes pages


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class PublicRoutingModule { }
