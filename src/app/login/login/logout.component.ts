import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { UserService } from '../../services/user.service';
import { Profile } from '../../models/profile'
import { Observable, Subject } from 'rxjs';
import { RegisterService } from '../../login/register/register.service';

declare var jQuery:any;
declare var $:any;

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
    private userService: UserService,
    private registerServices:RegisterService
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
    this.registerServices.pushGoBack()
  }

  logout() {

    this.loginService.logout();
    this.registerServices.pushClose();

    //CIERRA EL MENU
    this.btnLogin()


  }
  btnLogin(){ //CIERRA EL MENU
      $('.navbar-collapse').collapse('hide');
  }
}

function replacer(key, value) {
  //console.log(typeof value);
  if (key === 'email') {
    return undefined;
  }
  return value;
}
