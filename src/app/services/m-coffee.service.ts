import { Injectable } from '@angular/core';
import { Participant } from '../models/participant';
import { ParticipantInvitations } from '../models/ParticipantInvitations';
import { Headers, Http, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { LoginService } from './login.service';

@Injectable()
export class MCoffeeService {
    private participantList: Participant[]
    private participantListObservable$ = new Subject<Participant[]>();
    private participantInvitationsList: ParticipantInvitations[]
    private participantInvitationsListObservable$ = new Subject<ParticipantInvitations[]>();
    private subscriptionTimer;
    private acceptedInvitation$ = new Subject<boolean>();
    constructor(private http: Http, private loginServices: LoginService) {
      /*  this.subscriptionTimer = Observable.interval(1000 * 60).subscribe(x => {
            this.refreshLists(1);
        });*/
        this.subscriptionTimer = Observable.interval(1000 * 15).subscribe(x => {
            this.refreshLists(1);
        });
        this.loginServices.isLogin$().subscribe(
            login => { if(!login) this.subscriptionTimer.unsubscribe(); }
        );
    }

    /////////////////////////////participantes//////////////////////////////////////////////
    getParticipantList(coffeeId: number) {
        if (this.participantList == null) {
            this.loadParticipantList(coffeeId).subscribe(data => { });
            //this.loadParticipantList(coffeeId);
        } else { this.participantListChange(this.participantList) }

    }
    loadParticipantList(coffeeId: number): Observable<any> {
        const header = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer' + localStorage.getItem('token')
        });

        return this.http.get(environment.apiUrl + 'coffeeParticipants',
            { headers: header, params: { activity_id: coffeeId } })
            .map((res: Response) => {
                this.participantListChange(res.json().data.map((participant: Participant) => new Participant().deserialize(participant)))
            });
        // this.participantListChange(this.dummyRes.data.map((participant: Participant) => new Participant().deserialize(participant)))
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
        if (this.participantInvitationsList == null) {
            this.loadParticipantInvitationsList(coffeeId).subscribe(data => { })
            //this.loadParticipantInvitationsList(coffeeId);
        } else { this.participantInvitationsListChange(this.participantInvitationsList) }

    }
    loadParticipantInvitationsList(coffeeId: number): Observable<any> {
        const header = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer' + localStorage.getItem('token')
        });

        return this.http.get(environment.apiUrl + 'myCoffeeList',
            { headers: header, params: { activity_id: coffeeId } })
            .map((res: Response) => {
                this.participantInvitationsListChange(res.json().data.map((participantInvitations: ParticipantInvitations) => new ParticipantInvitations().deserialize(participantInvitations)))
            });
        // this.participantInvitationsListChange(this.dummyRes2.data.map((participantInvitations: ParticipantInvitations) => new ParticipantInvitations().deserialize(participantInvitations)))
    }
    getParticipantInvitationsListObservable$(): Observable<ParticipantInvitations[]> {
        return this.participantInvitationsListObservable$.asObservable();
    }
    public participantInvitationsListChange(participantInvitationsList: ParticipantInvitations[]) {
        this.participantInvitationsList = participantInvitationsList;
        this.participantInvitationsListObservable$.next(this.participantInvitationsList);
    }

    /////////////////////////////////////////////Acciones////////////////////////////////////////////

    sendInvitation(user_id: number, coffeeId: number): Observable<any> {
        const header = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer' + localStorage.getItem('token')
        });

        return this.http.post(environment.apiUrl + 'sendInvitation',
            {
                user_id: user_id,
                activity_id: coffeeId
            }
            , { headers: header })
            .map((res: Response) => {
                this.participantInvitationsListChange(res.json().data.map((participantInvitations: ParticipantInvitations) => new ParticipantInvitations().deserialize(participantInvitations)))
            });
        //this.participantInvitationsListChange(this.dummyRes3.data.map((participantInvitations: ParticipantInvitations) => new ParticipantInvitations().deserialize(participantInvitations)))

    }

    acceptInvitation(invitation_id: number): Observable<any> {
        const header = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer' + localStorage.getItem('token')
        });

        return this.http.post(environment.apiUrl + 'acceptInvitation',
            { invitation_id: invitation_id },
            { headers: header })
            .map((res: Response) => {
                this.participantInvitationsListChange(res.json().data.map((participantInvitations: ParticipantInvitations) => new ParticipantInvitations().deserialize(participantInvitations)))
            });
        //  this.participantInvitationsListChange(this.dummyRes4.data.map((participantInvitations: ParticipantInvitations) => new ParticipantInvitations().deserialize(participantInvitations)))
    }

    refreshLists(coffeeId: number) {
        //console.log("timer load")
        this.loadParticipantList(coffeeId).subscribe(data => { })
        this.loadParticipantInvitationsList(coffeeId).subscribe(data => { })
        if(this.hasInvitationAccepted()){
            //console.log("timer off")
            this.subscriptionTimer.unsubscribe();
        }
    }


    hasInvitationSent() {
        if (this.participantInvitationsList == null) {
            return false;
        }
        let act = this.participantInvitationsList.find(x => x.sent === 1);
        if (act !== undefined)
            return true;
        return false;
    }

    hasInvitationAccepted() {
        if (this.participantInvitationsList == null) {
            return false;
        }
        let act = this.participantInvitationsList.find(x => x.status_id === 4);
        if (act !== undefined){
            this.acceptedInvitation$.next(true);
            return true;
        }
        return false;
    }

    getAcceptedInvitation(): Observable<boolean> {
        return this.acceptedInvitation$.asObservable();
    }
}
