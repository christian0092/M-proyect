import { Injectable } from '@angular/core';
import { Participant } from '../models/participant';
import { ParticipantInvitations } from '../models/ParticipantInvitations';
import { Headers, Http, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class MCoffeeService {
    private dummyRes = {
        "success": true, "data": [{
            "user_id": 1, "avatar": null, "name": "Juan",
            "surname": "Perez",
            "status_id": 0,
            "status": "No disponible"
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
        }, {
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
    private dummyRes2 = {
        "success": true,
        "data": [
            {
                "invitation_id": 2,
                "user_id": 46,
                "avatar": "avatar_default.gif",
                "name": "Maria",
                "surname": "Torres",
                "status_id": 3,
                "status": "Pendiente",
                "sent": 0
            },
            {
                "invitation_id": 3,
                "user_id": 8,
                "avatar": "avatar_default.gif",
                "name": "Matias",
                "surname": "Pavon",
                "status_id": 3,
                "status": "Pendiente",
                "sent": 0
            },
            {
                "invitation_id": 14,
                "user_id": 46,
                "avatar": "avatar_default.gif",
                "name": "Maria",
                "surname": "Torres",
                "status_id": 3,
                "status": "Pendiente",
                "sent": 1
            }
        ],
        "message": "Lista recuperada correctamente"
    }
    private dummyRes3 = {
        "success": true,
        "data": [
            {
                "invitation_id": 2,
                "user_id": 46,
                "avatar": "avatar_default.gif",
                "name": "Maria",
                "surname": "Torres",
                "status_id": 3,
                "status": "Pendiente",
                "sent": 0
            },
            {
                "invitation_id": 3,
                "user_id": 8,
                "avatar": "avatar_default.gif",
                "name": "Matias",
                "surname": "Pavon",
                "status_id": 3,
                "status": "Pendiente",
                "sent": 0
            },
            {
                "invitation_id": 14,
                "user_id": 46,
                "avatar": "avatar_default.gif",
                "name": "Maria",
                "surname": "Torres",
                "status_id": 3,
                "status": "Pendiente",
                "sent": 1
            }
        ],
        "message": "Lista recuperada correctamente"
    }

    private dummyRes4 = {
        "success": true,
        "data": [
            {
                "invitation_id": 2,
                "user_id": 46,
                "avatar": "avatar_default.gif",
                "name": "Maria",
                "surname": "Torres",
                "status_id": 3,
                "status": "Pendiente",
                "sent": 0
            },
            {
                "invitation_id": 3,
                "user_id": 8,
                "avatar": "avatar_default.gif",
                "name": "Matias",
                "surname": "Pavon",
                "status_id": 3,
                "status": "Pendiente",
                "sent": 0
            },
            {
                "invitation_id": 14,
                "user_id": 46,
                "avatar": "avatar_default.gif",
                "name": "Maria",
                "surname": "Torres",
                "status_id": 3,
                "status": "Pendiente",
                "sent": 1
            }
        ],
        "message": "Lista recuperada correctamente"
    }

    private participantList: Participant[]
    private participantListObservable$ = new Subject<Participant[]>();
    private participantInvitationsList: ParticipantInvitations[]
    private participantInvitationsListObservable$ = new Subject<ParticipantInvitations[]>();
    constructor(private http: Http) { }


    /////////////////////////////participantes//////////////////////////////////////////////
    getParticipantList(coffeeId: number) {
        if (this.participantList == null) {
            //this.loadParticipantList(coffeeId).subscribe(data => { });
            this.loadParticipantList(coffeeId);
        } else { this.participantListChange(this.participantList) }

    }
    loadParticipantList(coffeeId: number)/*: Observable<any>*/ {
        //console.log('Estoy en load, la id es:' + coffeeId)
     /*   const header = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer' + localStorage.getItem('token')
        });

        return this.http.get(environment.apiUrl + 'coffeeParticipants',
            { headers: header, params: { activity_id: coffeeId } })
            .map((res: Response) => {
                console.log("cargue!!!")
                this.participantListChange(res.json().data.map((participant: Participant) => new Participant().deserialize(participant)))
            });*/
         this.participantListChange(this.dummyRes.data.map((participant: Participant) => new Participant().deserialize(participant)))
    }
    getParticipantListObservable$(): Observable<Participant[]> {
        return this.participantListObservable$.asObservable();
    }

    public participantListChange(participantList: Participant[]) {
        this.participantList = participantList;
        this.participantListObservable$.next(this.participantList);
    }
    //////////////////////////////////////////////////////////////////////////////////

    //////////////////////////////invitaciones//////////////////////////////////////
    getParticipantInvitationsList(coffeeId: number) {
        //console.log('estoy en invitacioness')
        if (this.participantInvitationsList == null) {
            //console.log('estoy en invitaciones cargando desde el server')
            //this.loadParticipantInvitationsList(coffeeId).subscribe(data => { })
            this.loadParticipantInvitationsList(coffeeId);
        } else { this.participantInvitationsListChange(this.participantInvitationsList) }

    }
    loadParticipantInvitationsList(coffeeId: number)/*: Observable<any> */{
       /* console.log('Estoy en load, la id es:' + coffeeId)
        const header = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer' + localStorage.getItem('token')
        });

        return this.http.get(environment.apiUrl + 'myCoffeeList',
            { headers: header, params: { activity_id: coffeeId } })
            .map((res: Response) => {
                this.participantInvitationsListChange(res.json().data.map((participantInvitations: ParticipantInvitations) => new ParticipantInvitations().deserialize(participantInvitations)))
            });*/
          this.participantInvitationsListChange(this.dummyRes2.data.map((participantInvitations: ParticipantInvitations) => new ParticipantInvitations().deserialize(participantInvitations)))
    }
    getParticipantInvitationsListObservable$(): Observable<ParticipantInvitations[]> {
        return this.participantInvitationsListObservable$.asObservable();
    }
    public participantInvitationsListChange(participantInvitationsList: ParticipantInvitations[]) {
        this.participantInvitationsList = participantInvitationsList;
        //console.log('estoy en invitacioness empujando valores')
        this.participantInvitationsListObservable$.next(this.participantInvitationsList);
    }

    /////////////////////////////////////////////Acciones////////////////////////////////////////////

    sendInvitation(user_id: number)/*: Observable<any>*/ {
      /*  const header = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer' + localStorage.getItem('token')
        });

        return this.http.post(environment.apiUrl + 'sendInvitation',
            { user_id: user_id }
            , { headers: header })
            .map((res: Response) => {
                this.participantInvitationsListChange(res.json().data.map((participantInvitations: ParticipantInvitations) => new ParticipantInvitations().deserialize(participantInvitations)))
            });*/
         this.participantInvitationsListChange(this.dummyRes3.data.map((participantInvitations: ParticipantInvitations) => new ParticipantInvitations().deserialize(participantInvitations)))

    }

    acceptInvitation(invitation_id: number)/*: Observable<any>*/ {
     /*   const header = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer' + localStorage.getItem('token')
        });

        return this.http.post(environment.apiUrl + 'acceptInvitation',
            { invitation_id: invitation_id },
            { headers: header })
            .map((res: Response) => {
                this.participantInvitationsListChange(res.json().data.map((participantInvitations: ParticipantInvitations) => new ParticipantInvitations().deserialize(participantInvitations)))
            });*/
        this.participantInvitationsListChange(this.dummyRes4.data.map((participantInvitations: ParticipantInvitations) => new ParticipantInvitations().deserialize(participantInvitations)))
    }
}
