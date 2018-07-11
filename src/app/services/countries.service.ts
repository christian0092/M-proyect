import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Headers, Http, Response } from '@angular/http';
import { environment } from '../../environments/environment';
@Injectable()
export class CountriesService {
private header = new Headers();

  constructor(private http: Http) { }

  getCountries() {
    this.header.append('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + 'countries', { headers: this.header })
      .map((response: Response) => response.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

}
