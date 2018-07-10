import { Injectable } from '@angular/core';
import { Headers, Http, Response} from '@angular/http';
import { environment } from '../../../environments/environment';
import { Observable, Subject  } from 'rxjs';
import { Activity } from '../../models/activity';

@Injectable()

export class ActividadService {

  private header = new Headers();
  private onActivityclick$ = new Subject<Activity>();

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

  checkActivity(data){

    const header = new Headers({ 'Content-Type': 'application/json','Authorization':'Bearer' + localStorage.getItem('token') });

    return this.http.get(
      environment.apiUrl + 'activitiesPerson',
         { headers: header, params:{event_id:data}}
    ).map((response: Response) => response.json());
  }

  onActivityclick(): Observable<Activity> {
    return this.onActivityclick$.asObservable();
  }

  public onActivityclickchange(activity: Activity) {
    this.onActivityclick$.next(activity);
  }

}
