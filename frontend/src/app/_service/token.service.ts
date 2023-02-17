import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { PnavbarComponent } from '../public/pnavbar/pnavbar.component';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  
  currentUser: any;

  constructor(private router:Router) { }

  // j'enregistre le token dans le local storage
  saveToken(token: string) {
    localStorage.setItem('token', token);
    this.router.navigate(['posts']);
  }

  // j'enregistre le user dans le local storage
  saveUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // j'enregistre la page dans le local storage
  savePageLocalStorage(page: any) {
    localStorage.setItem('page', JSON.stringify(page));
  }

  // je recupere le token dans le local storage
  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  // je verifie si le token est dans le local storage et si il est valide
  isLogged(): boolean {
    const token = localStorage.getItem('token');
    return !! token;
  }

  // je recupere le user dans le local storage
  getUserLogged(): any {
    this.currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    return this.currentUser;
  }

  // je recupere la page dans le local storage
  getPage(): any {
    return localStorage.getItem('page');
  }

  // je supprime le token et le user du local storage et je redirige vers la page d'accueil
  clearToken(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }
}
