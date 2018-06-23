import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { User } from '../../login/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
  /*changeDetection: ChangeDetectionStrategy.OnPush*/
})
export class LoginComponent implements OnInit {

  constructor(
    private loginService:LoginService
  ) { }

  ngOnInit() {
  }

  login(user: User){
    this.loginService.login(user).subscribe(
      data => {
        this.loginService.setLogin(data, user.username);
      },
      error =>  console.log(<any>error));
  }
}
