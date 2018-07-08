import { Injectable } from '@angular/core';
import { Headers, Http, Response} from '@angular/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()

export class ActividadService {

  private header = new Headers();

  constructor(private http: Http) { }

  addActivityUser(data){
    const header = new Headers({ 'Content-Type': 'application/json','Authorization':'Bearer' + localStorage.getItem('token') });

    let body = {
      'activity_id': data
    };

    return this.http.post(
      environment.apiUrl + 'subscribeActivity', body,
      { headers: header}
    ).map((response: Response) => response.json());
  }

  deleteActivityUser(data){
    const header = new Headers({ 'Content-Type': 'application/json','Authorization':'Bearer' + localStorage.getItem('token') });

    let body = {
      'activity_id': data
    };

    return this.http.post(
      environment.apiUrl + 'unsubscribeActivity', body,
      { headers: header}
    ).map((response: Response) => response.json());
  }

}
