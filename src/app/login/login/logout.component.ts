import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { UserService } from '../../services/user.service';
import { Profile } from '../../models/profile'
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  user: String = "Mi usuario";

  myProfile: Profile;
  myProfile$: Observable<Profile>;
  isLogged$: Observable<boolean>
  isLogged: boolean;

  constructor(
    private loginService: LoginService,
    private userService: UserService
  ) {
    this.isLogged = this.loginService.isLogin()
    if (this.isLogged == true) {
    this.myProfile$ = this.userService.getMyProfile2();
    this.myProfile$.subscribe(profile => { 
      this.userService.changeMyProfile(profile);
      this.setUserName(profile) });      
    }
  }

  setUserName(profile: Profile) {   
    if (profile.person != null) {
      this.user = profile.person.name + ' ' + profile.person.surname;
    }
    else if (profile.organization != null) {
      this.user = profile.organization.name;
    }
  }

  ngOnInit() {
  }

  logout() {
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
