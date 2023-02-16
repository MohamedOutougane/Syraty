import { HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { DataService } from 'src/app/_service/data.service';
import { ICredential } from 'src/app/_interface/credential';
import { IuserReturn } from 'src/app/_interface/userReturn';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/_service/token.service';
import { PnavbarComponent } from 'src/app/public/pnavbar/pnavbar.component';


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


  // login = new Login();
  password: any;
  email: any;
  page: boolean = false;
  // return: any;


  constructor(private dataService: DataService, private tokenService: TokenService, private router: Router) { }


  loginUser() {
    const formData: any = new FormData();
    formData.append("email", this.form.email);
    formData.append("password", this.form.password);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    console.log('insertion d\'un post');
    console.log(this.form.email);
    console.log(this.form.password);
    console.log(this.form);
    this.dataService.loginUser(this.form, httpOptions).subscribe(res=> {
      console.log(res);
      this.return = res;
      // this.return.user = res.user;
      console.log(res);
      console.log(this.return);
      console.log(this.return.token);
      console.log(this.return.user);
      console.log(this.return.user);

      this.tokenService.saveToken(this.return.token);
      this.tokenService.saveUser(this.return.user);

      // this.router.navigate(['posts']);
      this.setPagePosts();


      // this.getPostsData();
    });
  }

  setPagePosts() {
    this.page = true;
    return true;
  }
}
