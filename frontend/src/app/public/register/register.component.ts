import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IRegister } from 'src/app/_interface/register';
import { DataService } from 'src/app/_service/data.service';
import { TokenService } from 'src/app/_service/token.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  return: any;
  page: boolean | undefined;

  form: IRegister = {
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  };

  constructor(private dataService: DataService, private tokenService: TokenService, private router: Router) { }

  registerUser() {
    const formData: any = new FormData();
    formData.append("name", this.form.name);
    formData.append("email", this.form.email);
    formData.append("password", this.form.password);
    formData.append("password_confirmation", this.form.password_confirmation);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    console.log('insertion d\'un post');
    console.log(this.form.email);
    console.log(this.form.password);
    console.log(this.form);
    this.dataService.registerUser(this.form, httpOptions).subscribe(res=> {
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

