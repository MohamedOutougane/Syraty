import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { OthersPostComponent } from './others-post/others-post.component';
import { PostsComponent } from './posts/posts.component';
import { PublicRoutingModule } from './public-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PlayoutComponent } from './playout/playout.component';
import { PnavbarComponent } from './pnavbar/pnavbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { RegisterComponent } from './register/register.component';



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
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    // BrowserModule,
    HttpClientModule,
    FormsModule,
  ]
})
export class PublicModule implements OnInit { 
  ngOnInit() {
    console.log('PublicModule');
  }
}
