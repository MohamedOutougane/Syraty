import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from 'src/app/_service/token.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  page: any;

  constructor(private activated: ActivatedRoute, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.activated.data.subscribe((data: any) => {
      console.log(data.title);
    });
  }

}
