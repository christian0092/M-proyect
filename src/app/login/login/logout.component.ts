import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import {UserService} from '../../services/user.service';
import {Profile} from '../../models/profile'
import { Observable,Subject } from 'rxjs';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  user:String="Mi usuario";

  myProfile:Profile;
  myProfile$: Observable<Profile>;


  constructor(
    private loginService:LoginService, private userService:UserService
  ) {
   }

  ngOnInit() {
    //this.userService.getMyProfile().subscribe(profile=>this.user=profile.name)
    //this.userService.checkMyProfile();

    this.myProfile$ = this.userService.getMyProfile2();
    this.myProfile$.subscribe(
        profile => {
          this.myProfile = profile;
          console.log(this.myProfile.person.name)
          this.user=this.myProfile.person.name;
    });

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
