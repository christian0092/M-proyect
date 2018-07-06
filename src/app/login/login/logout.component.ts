import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import {UserService} from '../../services/user.service';
import {Profile} from '../../models/profile'

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  user:String="hola";


  constructor(
    private loginService:LoginService, private userService:UserService
  ) {
   }

  ngOnInit() {
    this.userService.getMyProfile().subscribe(profile=>this.user=profile.name)
    this.userService.checkUser();
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