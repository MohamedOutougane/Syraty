import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { OthersPostComponent } from './others-post/others-post.component';
import { PostsComponent } from './posts/posts.component';
import { PublicRoutingModule } from './public-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PlayoutComponent } from './playout/playout.component';
import { PnavbarComponent } from './pnavbar/pnavbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    HomeComponent,
    OthersPostComponent,
    PostsComponent,
    PlayoutComponent,
    PnavbarComponent,
    DashboardComponent,
    SearchFormComponent,
    RegisterComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    HttpClientModule,
    FormsModule,
  ]
})
export class PublicModule implements OnInit { 
  ngOnInit() {
    console.log('PublicModule');
  }
}
