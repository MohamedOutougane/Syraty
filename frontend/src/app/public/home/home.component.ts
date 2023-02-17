import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  page: any;
  assetPath = "http://127.0.0.1:8000/images"

  constructor() { }

  ngOnInit(): void {
  }
}
