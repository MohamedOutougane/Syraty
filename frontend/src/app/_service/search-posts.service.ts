import { Injectable } from '@angular/core';
import { PnavbarComponent } from '../public/pnavbar/pnavbar.component';
import { PostsComponent } from '../public/posts/posts.component';
import { SearchFormComponent } from '../public/search-form/search-form.component';

@Injectable({
  providedIn: 'root'
})
export class SearchPostsService {
  SearchedPosts: any;

  constructor(private searchFormComponent: SearchFormComponent) { }

  giveSearchedData() {
    console.log('the searched posts are : ' + this.searchFormComponent.getPostsSearched());
    return this.searchFormComponent.getPostsSearched();
  }
}
