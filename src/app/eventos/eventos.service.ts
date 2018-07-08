import { Injectable } from '@angular/core';
import { Headers, Http, Response} from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';


@Injectable()
export class EventosService {

private header = new Headers();

  constructor(private http: Http) { }

  getEvent() {

    this.header.append('Content-Type', 'application/json');

    return this.http.get(environment.apiUrl + 'events',  { headers: this.header })
      .map((response: Response) => response.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
  getEventActivities(data) {

    this.header.append('Content-Type', 'application/json');

    return this.http.get(
      environment.apiUrl + 'activities_event',
       { headers: this.header, params:{event_id:data}}
     ).map((response: Response) => response.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  addEventUser(data){
    const header = new Headers({ 'Content-Type': 'application/json','Authorization':'Bearer' + localStorage.getItem('token') });

    let body = {
      'event_id': data
    };

    return this.http.post(
      environment.apiUrl + 'subscribeEvent', body,
      { headers: header}
    ).map((response: Response) => response.json());
  }
  
  deleteEventUser(data){
    const header = new Headers({ 'Content-Type': 'application/json','Authorization':'Bearer' + localStorage.getItem('token') });

    let body = {
      'event_id': data
    };

    return this.http.post(
      environment.apiUrl + 'unsubscribeEvent', body,
      { headers: header}
    ).map((response: Response) => response.json());
  }
}
