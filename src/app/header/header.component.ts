import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LoginService } from '../services/login.service';

declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  isLogged : boolean;
  isLogged$: Observable<boolean>;



  constructor(
    private loginService : LoginService,
  ) { }

  ngOnInit() {
    //CIERRA EL MENU/////////////////////////////////
    $('.navbar-nav>li>a').on('click', function(){
      $('.navbar-collapse').collapse('hide');
    });
    /////////////////////////////////////////////////


    this.isLogged$ = this.loginService.isLogin$();
    this.isLogged$.subscribe(
      isLogged => {
        this.isLogged = isLogged;
      });
    this.loginService.checkLogin();
  }

  btnLogin(){ //CIERRA EL MENU
      $('.navbar-collapse').collapse('hide');
  }

}
