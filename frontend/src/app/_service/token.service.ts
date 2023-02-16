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

  saveToken(token: string) {
    localStorage.setItem('token', token);
    this.router.navigate(['posts']);
  }

  saveUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  savePageLocalStorage(page: any) {
    localStorage.setItem('page', JSON.stringify(page));
  }

  getUserLogged(): any {
    // let user = localStorage.getItem('user');
    this.currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    // const userObject = JSON.parse(localStorage.getItem('user'));
    console.log(this.currentUser);
    return this.currentUser;
    // return JSON.parse(user);
  }

  getPage(): any {
    return localStorage.getItem('page');
  }

  isLogged(): boolean {
    const token = localStorage.getItem('token');
    console.log(token)
    return !! token;
  }

  clearToken(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }
  getToken(): string {
    return localStorage.getItem('token') || '';
  }

}
