import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs/Rx';

@Injectable()
export class AuthService {

  //private logged:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(true);

  constructor() { }
/*
  isLogin():Observable<boolean>{
    return this.logged.asObservable();
  }

  setLogin(value):Observable<boolean>{
    this.logged = value;
  }

  onLogin(valor) {
        this.logged = valor;
  }*/


}
