import { Injectable } from '@angular/core';
import { FormGroup} from '@angular/forms';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class MSummitService {

private header = new Headers();

  constructor(private http: Http) {
   }

  send(data:FormGroup): Observable<object> {
    this.header.append('Content-Type', 'application/json');
  //  this.header.append('Authorization', 'Bearer ' + localStorage.getItem('userToken')['access_token']);
    return this.http.get(
      environment.apiUrl + 'partnerContact', { headers: this.header, search: data }
    ).map((response: Response) => response.json())
    .catch((Error:any)=>Observable.throw(Error.json()))
  }

}
