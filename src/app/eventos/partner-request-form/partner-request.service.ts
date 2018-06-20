import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
@Injectable()

export class PartnerRequestService {

  private url = 'http://services.mwork.com.ar/';
  private header = new Headers();

  constructor(private http: Http) {
   }

  send(data): Observable<object> {
    this.header.append('Content-Type', 'application/json');
  //  this.header.append('Authorization', 'Bearer ' + localStorage.getItem('userToken')['access_token']);

    return this.http.get(
      this.url + 'partnerContact', { headers: this.header, search: data }
    ).map((response: Response) => response.json());
  }

}
