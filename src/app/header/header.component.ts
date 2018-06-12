import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LoginService } from '../services/login.service';

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
    private loginService : LoginService
  ) { }

  ngOnInit() {
    this.isLogged$ = this.loginService.isLogin$();
    this.isLogged$.subscribe(
      isLogged => {
        this.isLogged = isLogged;        
      });
    this.loginService.checkLogin();
  }
}
