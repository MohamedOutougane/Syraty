import { Component, ElementRef, Injectable } from '@angular/core';
import { DataService } from 'src/app/_service/data.service';
import { TokenService } from 'src/app/_service/token.service';
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
      private elementRef: ElementRef
    ) { }
  
    ngOnInit() {
      this.getRatingsData();
      this.showHideForm();
    }

    // je récupere les valeurs de la recherche
    search(searchForm: { value: any; }){
      const formData: any = new FormData();

      if (this.tokenService.getPage() == '"posts"') {

        this.getUserLoggedId();

        if (this.userLoggedId == null) {
          this.userLoggedId = '';
        }

        formData.append('user_id', this.userLoggedId);
        this.page = 1;
      }

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

      this.dataService.getSearchedData(formData).subscribe((data:any) => {
        this.postsSearched = data;
        searchResults.next(this.postsSearched);
      });

      this.searchForm =  formData;
    }

    // je cache et affiche le formulaire de recherche
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

    // je récupere l'id de l'utilisateur connecté
    getUserLoggedId() {
      this.userLogged = this.tokenService.getUserLogged();
      this.userLoggedId = this.userLogged.id;
    }

    // je récupere les données du formulaire de recherche
    getpostsSearchedData() {
        return this.searchForm;
    }

    // je récupere les posts de la recherche
    getPostsSearched() {
      return this.postsSearched;
    }

    // je récupere les ratings
    getRatingsData() {
      this.dataService.getPublicData().subscribe((res: any) => {
        this.ratings = res.ratings;
      });
    }
}
