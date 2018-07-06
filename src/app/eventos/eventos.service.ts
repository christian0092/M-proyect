import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';


@Injectable()
export class EventosService {

private header = new Headers();

  constructor(private http: Http) { }

  getEvent() {

    this.header.append('Content-Type', 'application/json');
    let body = {
      'id': 1
    };
    return this.http.get(environment.apiUrl + 'events',  { headers: this.header })
      .map((response: Response) => response.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
  getEventActivities() {

    this.header.append('Content-Type', 'application/json');
  


    return this.http.get(environment.apiUrl + 'activities_event?event_id=1',  { headers: this.header })
      .map((response: Response) => response.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

}
