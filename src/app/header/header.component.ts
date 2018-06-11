import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Rx';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  isLogin: boolean;


  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.isLogin=true;
    //this.isLogin=this.authService.isLogin().source._value;
    //console.log(this.isLogin);
    //this.isLogin = this.authService.logged.value;
    /*    this.authService.isLogin().subscribe(
      data => {
        this.isLogin = data;
        console.log("jajaj" + this.isLogin);
      }
    );*/
  }
/*
  onLogin(user) {
        this.authService.onLogin();
      }

*/



}
