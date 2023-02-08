import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any;
  ratings: any;

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
  insertData() {
    console.log('insertion d\'un post');
    // this.dataService.insertData().subscribe(res => {
    //   console.log(res);
    //   this.posts = res;
    // });
  }
}
