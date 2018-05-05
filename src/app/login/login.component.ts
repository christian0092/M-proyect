import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  nivel;
  constructor(private loginService:LoginService) { }

  ngOnInit() {
  }

  login(datos){
    this.nivel=this.loginService.getLogin(datos);/*.subscribe(*/
      /*data => {
       console.log(data);
       this.grupos=this.grupoService.getGrupos();
      },
      error =>  console.log(<any>error));*/
  }
}
