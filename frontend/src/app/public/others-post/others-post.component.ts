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
  serverPath = "http://127.0.0.1:8000/";

  constructor(private dataService: DataService, private activated: ActivatedRoute, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.getPostsData();

    // je recupere les posts de la recherche
    searchResults.subscribe((results) => {
      this.posts = results.posts;
      this.ratings = results.ratings;
    });
  }

  //  je récuperes les posts public et je les affiches
  getPostsData() {
    this.dataService.getPublicData().subscribe((res: any) => {
      this.posts = res.posts;

      this.path = this.serverPath + "storage";
      this.assetPath = this.serverPath + "images";
    });
  }
}
