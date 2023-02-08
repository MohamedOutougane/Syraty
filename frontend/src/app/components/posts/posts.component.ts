import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';
import { Post } from 'src/app/post';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any;
  ratings: any;
  path: any;
  assetPath: any;
  post=new Post();
  imageFile: File | undefined;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getPostsData();
    this.getRatingsData();
  }

  getPostsData() {
    console.log('liste des posts');
    this.dataService.getData().subscribe((res: any) => {
      console.log(res.posts);
      this.posts = res.posts;

      this.path = "http://127.0.0.1:8000/storage"
      this.assetPath = "http://127.0.0.1:8000/images"

    });
  }
  getRatingsData() {
    console.log('liste des ratings');
    this.dataService.getData().subscribe((res: any) => {
      console.log(res.ratings);
      this.ratings = res.ratings;
    });
  }

  processFile(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    this.imageFile = file;
  }
  insertData() {
    const formData: any = new FormData();
    formData.append("image", this.imageFile);
    formData.append("title", this.post.title);
    formData.append("body", this.post.body);
    formData.append("rating_id", this.post.rating_id);
    formData.append("public", this.post.public);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data'
      })
    };
    console.log('insertion d\'un post');
    // this.post.image = file;
    console.log(this.post.image);
    console.log(this.post);
    console.log(this.imageFile);
    this.post.image = this.imageFile;
    this.dataService.insertData(formData, httpOptions).subscribe(res => {
      console.log(res);
      // this.posts = res;
      this.getPostsData();
    });
  }
  deleteData(id: any) {
    console.log(id);
    console.log('suppression d\'un post');
    this.dataService.deleteData(id).subscribe(res => {
      console.log(res);
      this.getPostsData();
    });
  }
  
}
