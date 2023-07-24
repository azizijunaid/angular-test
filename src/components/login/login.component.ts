import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements AfterViewInit {

  selectedAgent: string = "option1";
  selectedCountry: string = "option1";

  constructor() { }

  ngAfterViewInit() {

  }
}
