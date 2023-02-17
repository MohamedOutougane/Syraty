import { Component, ElementRef, Injectable } from '@angular/core';
import { DataService } from 'src/app/_service/data.service';
import { TokenService } from 'src/app/_service/token.service';
import { PnavbarComponent } from '../pnavbar/pnavbar.component';
import { PostsComponent } from '../posts/posts.component';
import { searchResults } from 'src/app/_service/data.service';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent {
  query: string = '';
  startDate: any;
  endDate: any;
  selectedRating: any;
  ratings: any;
  userLogged: any;
  userLoggedId: any;
  postsSearched: any;
  searchForm: any;
  page: any;
  searchContainer: any;
  button: any;
  showFormButton: any;
  hideFormButton: any;
  
    constructor(
      private dataService: DataService, 
      private tokenService: TokenService, 
      private pNavbarComponent: PnavbarComponent,
      private elementRef: ElementRef
    
      ) { }
  
    ngOnInit() {
      this.getRatingsData();
      this.showHideForm();
    }

    search(searchForm: { value: any; }){

      

      // this.getRatingsData();
      const formData: any = new FormData();

      if (this.tokenService.getPage() == '"posts"') {


        this.getUserLoggedId();

        if (this.userLoggedId == null) {
          this.userLoggedId = '';
        }

        formData.append('user_id', this.userLoggedId);

        console.log('the user logged is : ' + this.userLoggedId);


        this.page = 1;
      }


      console.log('the page is : ' + this.tokenService.getPage());

      


      
      formData.append('search', this.query);

      if (this.startDate == null) {
        this.startDate = '';
      }
      if (this.endDate == null) {
        this.endDate = '';
      }
      if (this.selectedRating == null) {
        this.selectedRating = '';
      }
      formData.append('start_date', this.startDate);
      formData.append('end_date', this.endDate);
      formData.append('rating', this.selectedRating);
        console.log(searchForm.value);
        console.log(formData);

        this.dataService.getSearchedData(formData).subscribe((data:any) => {
          console.log(formData);
          console.log(data);
          this.postsSearched = data;

          searchResults.next(this.postsSearched);
        });

      this.searchForm =  formData;

      
    }

    showHideForm() {
      this.searchContainer = this.elementRef.nativeElement.querySelector('.search-container');
      this.showFormButton = this.elementRef.nativeElement.querySelector('.searchForm-button .showForm');
      this.hideFormButton = this.elementRef.nativeElement.querySelector('.searchForm-button .hideForm');

      this.searchContainer.style.display = 'none';
      this.hideFormButton.style.display = 'none';

      this.showFormButton.addEventListener('click', () => {
        this.searchContainer.style.display = 'block';
        this.showFormButton.style.display = 'none';
        this.hideFormButton.style.display = 'block';
      });
      
      this.hideFormButton.addEventListener('click', () => {
        this.searchContainer.style.display = 'none';
        this.hideFormButton.style.display = 'none';
        this.showFormButton.style.display = 'block';
      });
    }

    getUserLoggedId() {
      this.userLogged = this.tokenService.getUserLogged();
      this.userLoggedId = this.userLogged.id;
      console.log('the user logged is : ' + this.userLoggedId);
    }

    getpostsSearchedData() {
        return this.searchForm;
    }


    getPostsSearched() {
      return this.postsSearched;
    }

    getRatingsData() {
      console.log('liste des ratings');
      this.dataService.getPublicData().subscribe((res: any) => {
        console.log(res.ratings);
        this.ratings = res.ratings;
      });
    }
}