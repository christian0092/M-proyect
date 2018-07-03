import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class AccountsService {
  private header = new Headers();

  constructor(private http: Http) { }

  getAccounts() {
    this.header.append('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + 'accounts', { headers: this.header })
      .map((response: Response) => response.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}
