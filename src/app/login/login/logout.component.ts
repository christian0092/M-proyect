import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  user:String="hola";
  package:JSON;

  constructor(
    private loginService:LoginService, private userService:UserService
  ) {
   }

  ngOnInit() {
     this.package=this.userService.getUsername();
     this.user=this.package['email'];
  }

  logout(){

    this.loginService.logout(); 
  }
}
function replacer(key, value) {
  //console.log(typeof value);
  if (key === 'email') {
    return undefined;
  }
  return value;
}