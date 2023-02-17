import { Component, OnInit, ElementRef } from '@angular/core';
import { DataService } from '../../_service/data.service';
import { Post } from 'src/app/post';
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from 'src/app/_service/token.service';
import { SearchFormComponent } from 'src/app/public/search-form/search-form.component';
import { PnavbarComponent } from '../pnavbar/pnavbar.component';
import { SearchPostsService } from 'src/app/_service/search-posts.service';
import { searchResults } from 'src/app/_service/data.service';

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
  formContainer: any;
  button: any;
  userLogged: any;
  userLoggedId: any;
  postsSearched: any;
  page: any;
  showFormButton: any;
  hideFormButton: any;

  constructor(
    private dataService: DataService, 
    private elementRef: ElementRef, 
    private activated: ActivatedRoute, 
    private tokenService: TokenService,
    private pnavbarComponent: PnavbarComponent,
    private searchFormService: SearchPostsService
  ) { }

  ngOnInit(): void {
    this.getUserLoggedId();
    this.getPostsData();
    this.getRatingsData();
    this.showHideForm();
    this.activated.data.subscribe((data: any) => {
      console.log(data);
    });
    this.getSearchedPosts();
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



  getSearchedPosts() {
    this.postsSearched = this.searchFormService.giveSearchedData();
    console.log('the posts searched are : ' + this.postsSearched);
  }

  getUserLoggedId() {
    this.userLogged = this.tokenService.getUserLogged();
    this.userLoggedId = this.userLogged.id;
    console.log('the user logged is : ' + this.userLoggedId);
  }

  showHideForm() {
    this.formContainer = this.elementRef.nativeElement.querySelector('.form-container');
    this.showFormButton = this.elementRef.nativeElement.querySelector('.creator-button .showForm');
    this.hideFormButton = this.elementRef.nativeElement.querySelector('.creator-button .hideForm');

    this.formContainer.style.display = 'none';
    this.hideFormButton.style.display = 'none';

    this.showFormButton.addEventListener('click', () => {
      this.formContainer.style.display = 'block';
      this.showFormButton.style.display = 'none';
      this.hideFormButton.style.display = 'block';
    });
    
    this.hideFormButton.addEventListener('click', () => {
      this.formContainer.style.display = 'none';
      this.hideFormButton.style.display = 'none';
      this.showFormButton.style.display = 'block';
    });
  }

  getPostsData() {
    let userLoggedId = this.userLoggedId;
    console.log('liste des posts');
    this.dataService.getData(this.userLoggedId).subscribe((res: any) => {
      console.log(res.posts);
      this.posts = res.posts;

      this.path = "http://127.0.0.1:8000/storage"
      this.assetPath = "http://127.0.0.1:8000/images"

    });
  }
  getRatingsData() {
    console.log('liste des ratings');
    this.dataService.getData(this.userLoggedId).subscribe((res: any) => {
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
    formData.append("user_id", this.userLoggedId);
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
    // je veux envoyer mon bearer token dans la requête
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.tokenService.getToken()}`
      })
    };
    this.dataService.deleteData(id, httpOptions).subscribe(res => {
      console.log(res);
      this.getPostsData();
    });
  }
  
}
