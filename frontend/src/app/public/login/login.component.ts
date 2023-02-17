import { HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { DataService } from 'src/app/_service/data.service';
import { ICredential } from 'src/app/_interface/credential';
import { IuserReturn } from 'src/app/_interface/userReturn';
import { TokenService } from 'src/app/_service/token.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @Output() loggedIn = new EventEmitter();

  form: ICredential = {
    email: '',
    password: ''
  };

  return: IuserReturn = {
    token: '',
    user: {}
  }

  password: any;
  email: any;
  page: boolean = false;

  constructor(private dataService: DataService, private tokenService: TokenService) { }


  // je recupere les données du formulaire et je les envois au service
  // je recupere le token et le user et je les enregistre dans le local storage
  loginUser() {
    const formData: any = new FormData();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    formData.append("email", this.form.email);
    formData.append("password", this.form.password);
    
    this.dataService.loginUser(this.form, httpOptions).subscribe(res=> {

      this.return = res;

      this.tokenService.saveToken(this.return.token);
      this.tokenService.saveUser(this.return.user);

      this.setPagePosts();
    });
  }

  setPagePosts() {
    this.page = true;
    return true;
  }
}
