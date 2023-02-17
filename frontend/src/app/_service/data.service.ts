import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Post } from '../post';
import { Login } from '../login';
import { ICredential } from '../_interface/credential';
import { IuserReturn } from '../_interface/userReturn';
import { BehaviorSubject } from 'rxjs';

export const searchResults = new BehaviorSubject<any>([]);
@Injectable({
  providedIn: 'root'
})
export class DataService {

  adresse: string = 'http://127.0.0.1:8000/api/';

  constructor(private httpClient: HttpClient) { }
  getPublicData() {
    return this.httpClient.get(this.adresse + 'posts');
  }
  getData(id:any) {
    return this.httpClient.get(this.adresse + 'userPosts/'+ id);
  }
  insertData(data:Post, httpOptions:any) {
    return this.httpClient.post(this.adresse + 'addPost', data);
  }
  deleteData(id:any, httpOptions:any) {
    return this.httpClient.delete(this.adresse + 'deletePost/'+ id, httpOptions);
  }
  loginUser(credentials:ICredential, httpOptions:any) {
    return this.httpClient.post<IuserReturn>(this.adresse + 'login', credentials);
  }
  registerUser(credentials:any, httpOptions:any) {
    return this.httpClient.post<IuserReturn>(this.adresse + 'register', credentials);
  }
  getSearchedData(search:any) {
    return this.httpClient.post(this.adresse + 'search', search);
  }
}
