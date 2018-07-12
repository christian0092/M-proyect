import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable,Subject } from 'rxjs';
import { Event } from '../models/event';
import { Activity } from '../models/activity';

@Injectable()
export class EventosService {

private header = new Headers();

private MisEventIn: Event[];
private MisEventIn$ = new Subject<Event[]>();


  constructor(private http: Http) { }

  public changeMisEventValue(val) {
    this.MisEventIn = val;
    this.MisEventIn$.next(this.MisEventIn);

  }

  participoEvent(id){

    if(this.MisEventIn==null) return false
    for(let e of this.MisEventIn){
      if(e.id==id) return true;
    }
    return false;
  }

  getMisEventIn$(): Observable<Event[]> {
    return this.MisEventIn$.asObservable();
  }

  misEvent(): Observable<Event[]> {

    console.log('misEvent()');

    const header = new Headers({ 'Content-Type': 'application/json','Authorization': 'Bearer' + localStorage.getItem('token')});

    return this.http.get(environment.apiUrl + 'eventPerson', { headers: header })
      .map((res: Response) => res.json().data.map((event: Event) => new Event().deserialize(event)));
      //.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }


  getEvent(): Observable<Event[]> {
  this.header.append('Content-Type', 'application/json');

  return this.http.get(environment.apiUrl + 'events', { headers: this.header })
    .map((res: Response) => res.json().data.map((event: Event) => new Event().deserialize(event)));
    //.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
}

  getEventActivities(id):Observable<Activity[]> {

    this.header.append('Content-Type', 'application/json');
  //const header = new Headers({ 'Content-Type': 'application/json'});


  return this.http.get(environment.apiUrl + 'activities_event', { headers: this.header, params:{event_id:id} })
    .map((res: Response) => res.json().data.map((activity: Activity) => new Activity().deserialize(activity)));

    /*return this.http.get(
      environment.apiUrl + 'activities_event',
       { headers: header, params:{event_id:data}}
     ).map((response: Response) => response.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));*/
  }

  checkEvent(data) {

  const header = new Headers({ 'Content-Type': 'application/json','Authorization': 'Bearer' + localStorage.getItem('token')});

    return this.http.get(
      environment.apiUrl + 'isParticipatingEvent',
       { headers: header, params:{event_id:data}}
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
