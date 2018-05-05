import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class LoginService {

  constructor(private http:Http) { }

  getLogin(datos){
    console.log(datos);
    return this.http.get('http://localhost/lingual/Services/public/api/v1/grupos/nivel')
    .map((response:Response)=>response.json());
  }

}
