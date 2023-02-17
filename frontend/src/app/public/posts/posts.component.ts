import { Component, OnInit, ElementRef } from '@angular/core';
import { DataService } from '../../_service/data.service';
import { Post } from 'src/app/post';
import { HttpHeaders } from '@angular/common/http';
import { TokenService } from 'src/app/_service/token.service';
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
  serverPath = "http://127.0.0.1:8000/";

  constructor(
    private dataService: DataService, 
    private elementRef: ElementRef,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.getUserLoggedId();
    this.getPostsData();
    this.getRatingsData();
    this.showHideForm();
    searchResults.subscribe((results) => {
      this.posts = results.posts;
      this.ratings = results.ratings;
    });
  }

  // je récupere l'id de l'utilisateur connecté
  getUserLoggedId() {
    this.userLogged = this.tokenService.getUserLogged();
    this.userLoggedId = this.userLogged.id;
  }

  // j'affiche ou cache le formulaire de création de post
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

  // je récupere les posts de l'utilisateur connecté
  getPostsData() {
    this.dataService.getData(this.userLoggedId).subscribe((res: any) => {
      this.posts = res.posts;

      this.path = this.serverPath + "storage";
      this.assetPath = this.serverPath + "images";
    });
  }

  // je récupere les ratings de l'utilisateur connecté
  getRatingsData() {
    this.dataService.getData(this.userLoggedId).subscribe((res: any) => {
      this.ratings = res.ratings;
    });
  }

  // je récupere l'image du post
  processFile(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    this.imageFile = file;
  }

  // je crée un post
  insertData() {
    const formData: any = new FormData();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data'
      })
    };

    formData.append("user_id", this.userLoggedId);
    formData.append("image", this.imageFile);
    formData.append("title", this.post.title);
    formData.append("body", this.post.body);
    formData.append("rating_id", this.post.rating_id);
    formData.append("public", this.post.public);

    this.post.image = this.imageFile;
    this.dataService.insertData(formData, httpOptions).subscribe(res => {
      this.getPostsData();
    });
  }

  // je supprime un post
  deleteData(id: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.tokenService.getToken()}`
      })
    };

    this.dataService.deleteData(id, httpOptions).subscribe(res => {
      this.getPostsData();
    });
  }
  
}
