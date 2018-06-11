import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import {FormControl} from '@angular/forms';
import { LoginService } from '../services/login.service';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
  /*changeDetection: ChangeDetectionStrategy.OnPush*/
})
export class LoginComponent implements OnInit {
  data;

  constructor(private loginService:LoginService,private authService:AuthService) { }

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
