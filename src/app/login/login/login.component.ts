import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { User } from '../../login/user.model';
import {UserService} from '../../services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
  /*changeDetection: ChangeDetectionStrategy.OnPush*/
})
export class LoginComponent implements OnInit {

  constructor(
    private loginService:LoginService,
    private userService:UserService,
  ) { }

  ngOnInit() {
  }

  login(user: User){
    this.loginService.login(user).subscribe(
      data => {
        this.loginService.setLogin(data);
        this.addProfile();

      },
      error =>  console.log(<any>error));
  }

  addProfile(){
    this.userService.Profile().subscribe(profile => {
          console.log(profile['data']);
          this.userService.checkMyProfile(profile['data']);

    });
  }
}
