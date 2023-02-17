import { Component, OnInit, ElementRef } from '@angular/core';
import { DataService } from '../../_service/data.service';
import { Post } from 'src/app/post';
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from 'src/app/_service/token.service';
import { searchResults } from 'src/app/_service/data.service';

@Component({
  selector: 'app-others-post',
  templateUrl: './others-post.component.html',
  styleUrls: ['./others-post.component.css']
})
export class OthersPostComponent {
  posts: any;
  ratings: any;
  path: any;
  assetPath: any;
  page: any;

  constructor(private dataService: DataService, private activated: ActivatedRoute, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.getPostsData();
    this.activated.data.subscribe((data: any) => {
      console.log(data);
    });
    searchResults.subscribe((results) => {
      console.log('the results are : ' + JSON.stringify(results))
      // const resultsArray = Object.keys(results).map((key) => ({
      //   id: key,
      //   ...results[key],
      // }));
      this.posts = results.posts;
      this.ratings = results.ratings;
    });
  }

  getPostsData() {
    this.dataService.getPublicData().subscribe((res: any) => {
      this.posts = res.posts;

      this.path = "http://127.0.0.1:8000/storage"
      this.assetPath = "http://127.0.0.1:8000/images"
    });
  }
}
