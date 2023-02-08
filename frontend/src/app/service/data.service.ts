import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../post';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }
  getData() {
    return this.httpClient.get('http://127.0.0.1:8000/api/posts');
  }
  insertData(data:Post, httpOptions:any) {
    console.log('http://127.0.0.1:8000/api/addPost', data);
    return this.httpClient.post('http://127.0.0.1:8000/api/addPost', data);
  }
  deleteData(id:any) {
    console.log('http://127.0.0.1:8000/api/deletePost/'+ id);
    return this.httpClient.delete('http://127.0.0.1:8000/api/deletePost/'+ id);
  }
}
