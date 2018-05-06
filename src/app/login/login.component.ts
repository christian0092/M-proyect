import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  data;
  constructor(private loginService:LoginService) { }

  ngOnInit() {
  }

  login(datos){
    this.loginService.getLogin(datos).subscribe(
      data => {
       console.log(data);
      },
      error =>  console.log(<any>error));
  }
}
