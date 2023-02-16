import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from 'src/app/_service/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  page: any;
  assetPath = "http://127.0.0.1:8000/images"

  constructor(private activated: ActivatedRoute, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.activated.data.subscribe((data: any) => {
      console.log(data);
    });
  }
}
