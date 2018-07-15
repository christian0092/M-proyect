import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { User } from '../login/user.model';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {
  private loggedIn: boolean;
  private loggedIn$ = new Subject<boolean>();

  constructor(
    private http: Http,
    private router: Router,

  ) { }


  ngOnInit() {
  }



  login(user: User) {
    if (user.username !== '' && user.password !== '') {
      let body = {
        'email': user.username,
        'password': user.password
      };
      const header = new Headers({ 'Content-Type': 'application/json' });
      return this.http.post(
        environment.apiUrl + 'login',
        body,
        { headers: header }
      ).map((response: Response) => response.json())
      .catch((Error:any)=>Observable.throw(Error.json()));
    }
  }

  setLogin(data) {
    if (data.success) {
      localStorage.setItem('token', data.token.token);
      localStorage.setItem('name', data.token.name);
      localStorage.setItem('email', data.token.email);
      this.changeLoginValue(true);
    } else
      this.changeLoginValue(false);
  }

  private changeLoginValue(val) {
    this.loggedIn = val;
    this.loggedIn$.next(this.loggedIn);
  }

  isLogin() {
    return this.loggedIn;
  }

  checkLogin() {
    var session = localStorage.getItem("token");
    if (session == null) {
      this.changeLoginValue(false);
      return;
    }
    this.changeLoginValue(true);
  }

  isLogin$(): Observable<boolean> {
    return this.loggedIn$.asObservable();
  }

  logout() {
    this.changeLoginValue(false);
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    this.router.navigate(['home']);
  }

  register(data: object): Observable<object> {
    const header = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(
      environment.apiUrl + 'register',
      data,
      { headers: header }
    ).map((response: Response) => response.json())
    .catch((Error:any)=>Observable.throw(Error.json()));
  }

  sendResetPassword(data) {
    const header = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(
      environment.apiUrl + 'resetPassword',
      data,
      { headers: header }
    ).map((response: Response) => response.json())
    .catch((Error:any)=>Observable.throw(Error.json()));
  }

  edit(data: object): Observable<object> {
    const header = new Headers(
        { 'content-type': 'application/json',
          'Authorization': 'Bearer' + localStorage.getItem('token')
        });
    return this.http.post(
      environment.apiUrl + 'registerUpdate',
      data,
      { headers: header }
    ).map((response: Response) => response.json())    
    .catch((Error:any)=>Observable.throw(Error.json()));
  }
}
