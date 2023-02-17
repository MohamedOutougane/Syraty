import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { TokenService } from 'src/app/_service/token.service';
import { ChangeDetectorRef } from '@angular/core';

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
  
  constructor(private tokenService: TokenService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    // je recupere la page ou je suis
    this.changeDetectorRef.detectChanges();
  }

  logout(): void {
    this.tokenService.clearToken();
  }

  updateNavbar() {
    this.ngOnInit();
  }

  // je verifie si je suis connecté
  public get checkIfConnected(): boolean {
      this.isConnected = this.tokenService.isLogged();
      return this.isConnected;
  }


  // je defini la page ou je suis
  setPageImIn(thePage: any) {
    this.page = thePage;
    this.pageNow = this.page;

    this.savePage(this.page);
  }

  // je sauvegarde la page ou je suis dans le local storage
  savePage(page: any) {
    this.tokenService.savePageLocalStorage(page);
  }

  getThePage() {
    return this.pageNow;
  }
}
