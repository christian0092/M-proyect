import { Injectable } from '@angular/core';
import { Participant } from '../models/participant';
import { Headers, Http, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class MCoffeeService {
	private participantList:Participant[]
	private participantListObservable$ = new Subject<Participant[]>();
  constructor(private http: Http) { }

  getParticipantList(coffeeId:number) {
     if(this.participantList==null){
     	this.loadParticipantList(coffeeId)    	
    }else {this.participantListChange(this.participantList)}
    
  }
	loadParticipantList(coffeeId:number) {
      //console.log('Estoy en load, la id es:' + coffeeId)
         /*   const header = new Headers({ 
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer' + localStorage.getItem('token') 
    });

    return this.http.get(environment.apiUrl + 'coffeeParticipants', 
      { headers: header, params: { activity_id: data } })
      .map((res: Response) => {
        this.participantListChange(res.json().data.map((participant: Participant) => new Participant().deserialize(participant)))
      });*/
      var res={"success": true,"data": [
        {
            "user_id": 1,
            "avatar": null,
            "name": "Juan",
            "surname": "Perez",
            "status_id": 0,
            "status": "Disponible"
        },
        {
            "user_id": 46,
            "avatar": "avatar_default.gif",
            "name": "Maria",
            "surname": "Torres",
            "status_id": 1,
            "status": "Disponible"
        },
        {
            "user_id": 8,
            "avatar": "avatar_default.gif",
            "name": "Matias",
            "surname": "Pavon",
            "status_id": 2,
            "status": "Disponible"
        },
        {
            "user_id": 8,
            "avatar": "avatar_default.gif",
            "name": "Matias",
            "surname": "Pavon",
            "status_id": 3,
            "status": "Disponible"
        },{
            "user_id": 8,
            "avatar": "avatar_default.gif",
            "name": "Matias",
            "surname": "Pavon",
            "status_id": 4,
            "status": "Disponible"
        }
    ],
    "message": "Lista recuperada correctamente"
}


    this.participantListChange(res.data.map((participant: Participant) => new Participant().deserialize(participant)))
  }
  getParticipantListObservable$(): Observable<Participant[]> {
    return this.participantListObservable$.asObservable();
  }

  public participantListChange(participantList: Participant[]) {
          this.participantList = participantList;
    this.participantListObservable$.next(this.participantList);
  }

}
