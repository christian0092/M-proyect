import { Injectable } from '@angular/core';
import { Headers,Http, Response } from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class LoginService {

  constructor(private http:Http) { }

  getLogin(datos){
    //console.log(datos.password);console.log(datos.username);

    var header = new Headers({'Content-Type':'application/json'});
    //var data = "client_id=5&client_secret=ZDJVgOO3QmbJYCwpNMguCCSxjnwvuQCjDUxbvSdy&grant_tyoe=password&username="+datos.username+"&password="+datos.password;
    datos.client_id=5;
    datos.client_secret="ZDJVgOO3QmbJYCwpNMguCCSxjnwvuQCjDUxbvSdy";
    datos.grant_type="password";

    console.log(datos);
    return this.http.post('http://192.168.1.17:8080/oauth/token',datos,{headers:header})
    .map((response:Response)=>response.json());
  }

}


//JSON.strigify
