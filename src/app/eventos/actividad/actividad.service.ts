import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { environment } from '../../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { Activity } from '../../models/activity';

@Injectable()

export class ActividadService {

  private header = new Headers();

  private onActivityclick$ = new Subject<Activity>();

  private inActivities: Activity[];
  private inActivities$ = new Subject<Activity[]>();

  constructor(private http: Http) { }

  addActivityUser(data) {
    const header = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer' + localStorage.getItem('token') });

    let body = {
      'activity_id': data
    };

    return this.http.post(
      environment.apiUrl + 'subscribeActivity', body,
      { headers: header }
    ).map((response: Response) => response.json());
  }

  deleteActivityUser(data) {
    const header = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer' + localStorage.getItem('token') });

    let body = {
      'activity_id': data
    };

    return this.http.post(
      environment.apiUrl + 'unsubscribeActivity', body,
      { headers: header }
    ).map((response: Response) => response.json());
  }

  loadMyActivities(data) {
    const header = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer' + localStorage.getItem('token') });
    return this.http.get(
      environment.apiUrl + 'activitiesPerson',
      { headers: header, params: { event_id: data } }
    ).map((response: Response) => response.json());
  }

  getMyActivities(): Activity[] {
    return this.inActivities;
  }

  onActivityclick(): Observable<Activity> {
    return this.onActivityclick$.asObservable();
  }

  public onActivityclickchange(activity: Activity) {
    this.onActivityclick$.next(activity);
  }

  ////////////MY ACTIVITIES/////////////

  subscribeActivitiesObserver(): Observable<Activity[]> {
    return this.inActivities$.asObservable();
  }

  public ActivitiesChange(activities: Activity[]) {
    this.inActivities = activities;
    this.inActivities$.next(activities);
  }

  isMyActivity(id): boolean {
    if (this.inActivities == null) return false;
    let act = this.inActivities.find(x => x.id === id);
    if (act !== undefined)
      return true;
    return false;
  }

  hasSummit(): boolean {
    //console.log('estoy en hassummit')
    if (this.inActivities == null) {
      //console.log('las actividades son nulas')
      return false;}
    let act = this.inActivities.find(x => x.event_format_id === 3);
    if (act !== undefined)
      return true;
   // console.log('las actividades son indefinidas')
    return false;    
  }
  hasCoffe(): boolean {      
    //console.log('estoy en hasCoffe()')
    if (this.inActivities == null) {
      //console.log('las cafesitas son nulas')
      return false;}
    let act = this.inActivities.find(x => x.event_format_id === 5);//si alguna vez lees esto lucas me hiciste hacer una funcion para encontrar el numero marica ja
    if (act !== undefined){
      //console.log('lo encontre')
      return true;
    }
   //console.log('las cafesitas son indefinidas')
   //console.log('no lo encontre')
    return false;    
  }
}
