import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getPostsData();
  }

  getPostsData() {
    console.log('liste des posts');
    this.dataService.getData().subscribe(res => {
      console.log(res);
      this.posts = res;
    });
  }
}
