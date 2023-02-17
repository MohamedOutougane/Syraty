import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
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

  constructor(private dataService: DataService, private tokenService: TokenService) { }

  registerUser() {
    const formData: any = new FormData();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    formData.append("name", this.form.name);
    formData.append("email", this.form.email);
    formData.append("password", this.form.password);
    formData.append("password_confirmation", this.form.password_confirmation);

    this.dataService.registerUser(this.form, httpOptions).subscribe(res=> {
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

