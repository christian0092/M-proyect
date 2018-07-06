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

  addEventUser(){
    /*const header = new Headers({ 'Content-Type': 'application/json' });

    return this.http.post(
      environment.apiUrl + 'eventUser',
      data,
      { headers: header }
    ).map((response: Response) => response.json());*/
  }

}
