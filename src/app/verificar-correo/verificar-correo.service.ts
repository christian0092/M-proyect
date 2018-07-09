import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class VerificarCorreoService {

  constructor(private http: Http) { }

  addVerificar(data){
    const header = new Headers({ 'Content-Type': 'application/json' });

    return this.http.get(
      environment.apiUrl + 'register/verify',
       { headers: header, params:{code:data}}
    ).map((response: Response) => response.json());
  }

}
