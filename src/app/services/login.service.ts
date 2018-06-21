import { Injectable } from '@angular/core';
import { Headers,Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { User } from '../login/user.model';
import { environment } from '../../environments/environment';

@Injectable()
export class LoginService {
  private loggedIn : boolean;
  private loggedIn$ = new Subject<boolean>();

  constructor(
    private http:Http
  ) { }

  ngOnInit(){
  }

  login(user: User) {
    if (user.username !== '' && user.password !== '' ) {
        let body = {  'username': user.username,
                      'password': user.password,
                      'client_id': environment.clientId,
                      'client_secret': environment.clientSecret,
                      'grant_type': environment.grantType,
                      'scope': environment.scope
                     };
        const header = new Headers({'Content-Type': 'application/json'});

        return this.http.post(
            environment.apiUrl + 'oauth/token',
            body,
            {headers: header}
        ).map((response:Response)=>response.json());
    }
  }

  setLogin(data, email: string){
    if(data.access_token != null){
      localStorage.setItem('email', email);
      localStorage.setItem('token', data.access_token);
      this.changeLoginValue(true);
    } else
      this.changeLoginValue(false);
  }

  private changeLoginValue(val){
    this.loggedIn = val;
    this.loggedIn$.next(this.loggedIn);
  }

  isLogin(){
    return this.loggedIn;
  }

  checkLogin(){
    var session = JSON.parse(localStorage.getItem("token"));
    if(session == null){
      this.changeLoginValue(false);
      return;
    }
    this.changeLoginValue(true);
  }

  isLogin$(): Observable<boolean> {
    return this.loggedIn$.asObservable();
  }

  logout(){
    this.changeLoginValue(false);
    localStorage.removeItem("email");
    localStorage.removeItem("token");
  }

  register(data: object): Observable<object>{
    const header = new Headers({'Content-Type': 'application/json'});
    return this.http.post(
      environment.apiUrl + 'registro',
      data,
      {headers: header}
    ).map((response:Response)=>response.json());
  }
}
