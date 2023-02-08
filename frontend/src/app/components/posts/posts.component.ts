import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';
import { Post } from 'src/app/post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any;
  ratings: any;
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
    });
  }
  getRatingsData() {
    console.log('liste des ratings');
    this.dataService.getData().subscribe((res: any) => {
      console.log(res.ratings);
      this.ratings = res.ratings;
    });
  }
  processFile(imageInput: any) {
    const file = imageInput.files[0];
    this.imageFile = file;
  }
  insertData() {
    console.log('insertion d\'un post');
    // this.post.image = file;
    console.log(this.post.image);
    console.log(this.post);
    console.log(this.imageFile);
    this.post.image = this.imageFile;
    this.dataService.insertData(this.post).subscribe(res => {
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
