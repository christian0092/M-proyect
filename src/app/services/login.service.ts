import { Injectable } from '@angular/core';
import { Headers,Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { User } from '../login/user.model';

@Injectable()
export class LoginService {
  private loggedIn : boolean;
  private loggedIn$ = new Subject<boolean>();
  private url = 'http://localhost:8000/';
  private clientId = '1';
  private clientSecret = 'eudaqO1iymV1Oo9AsMudvrm08GYvmbExAbzD3IRj';
  private scope = '*';
  private grantType = 'password';

  constructor(
    private http:Http
  ) { }

  ngOnInit(){
  }

  login(user: User) {
    if (user.username !== '' && user.password !== '' ) {
        let body = {  'username': user.username,
                      'password': user.password,
                      'client_id': this.clientId,
                      'client_secret': this.clientSecret,
                      'grant_type': this.grantType,
                      'scope': this.scope
                     };
        const header = new Headers({'Content-Type': 'application/json'});

        return this.http.post(
            this.url+'oauth/token',
            body,
            {headers: header}
        ).map((response:Response)=>response.json());
    }
  }

  setLogin(data){
    if(data.access_token != ''){
      localStorage.setItem('userToken', JSON.stringify(data));
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
    var session = JSON.parse(localStorage.getItem("userToken"));
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
    localStorage.removeItem('userToken');
  }

  register(data: object): Observable<object>{
    const header = new Headers({'Content-Type': 'application/json'});
    return this.http.post(
      this.url+'registro',
      data,
      {headers: header}
    ).map((response:Response)=>response.json());
  }
}
