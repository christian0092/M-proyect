import { Injectable } from '@angular/core';
import { Headers, Http, Response} from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class ActividadService {

  private header = new Headers();

  constructor(private http: Http) { }

  addActivityUser(){
    /*const header = new Headers({ 'Content-Type': 'application/json' });

    return this.http.post(
      environment.apiUrl + 'eventUser',
      data,
      { headers: header }
    ).map((response: Response) => response.json());*/
  }

}
