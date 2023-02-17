import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/_service/token.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ChangeDetectorRef } from '@angular/core';
import { LoginComponent } from '../login/login.component';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-pnavbar',
  templateUrl: './pnavbar.component.html',
  styleUrls: ['./pnavbar.component.css']
})
export class PnavbarComponent implements OnInit{
  isConnected: boolean = false;
  page:any = 'othersPost';
  assetPath = "http://127.0.0.1:8000/images"
  postsPage: boolean = false;
  pageNow: any ;
  // isLogged: string = false;
  
  constructor(private router : Router, private tokenService: TokenService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.changeDetectorRef.detectChanges();
    // this.checkIfConnected();
    console.log(111111);
  }

  logout(): void {
    this.tokenService.clearToken();
  }

  updateNavbar() {
    this.ngOnInit();
  }

  public get checkIfConnected(): boolean {
      this.isConnected = this.tokenService.isLogged();
      return this.isConnected;

  }


  setPageImIn(thePage: any) {
  console.log(222222);

    this.page = thePage;
    this.pageNow = this.page;
    console.log(thePage);

    console.log(this.page);
  console.log(33333);

  this.savePage(this.page);

  }

  savePage(page: any) {
    this.tokenService.savePageLocalStorage(page);
  }

  getPageImIn() {
    console.log(this.page);
  }

  getThePage() {
    console.log(this.page);
    return this.pageNow;
  }
}
