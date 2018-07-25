import { Component, OnInit, Input } from '@angular/core';
import { Participant} from  '../../models/participant'
import { ParticipantInvitations} from  '../../models/ParticipantInvitations'
import {MCoffeeService} from '../../services/m-coffee.service'


@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.css']
})
export class ParticipantComponent implements OnInit {
@Input() participant:Participant;
@Input() participantInvitations:ParticipantInvitations
@Input() coffeeId:number;
	Show:boolean=false;
  constructor(private mCoffeeService:MCoffeeService) { }

  ngOnInit() {
    //console.log('Estoy en participant: '+this.participant.name)
    //console.log('Estoy en participantList: '+this.participantInvitations.name)
  }
 displayshow(){
  	return  this.Show;
  }  
  sendInvitation(){
console.log('estoy enviando la invitacion')
this.mCoffeeService.sendInvitation(this.participant.user_id)
this.mCoffeeService.loadParticipantList(this.coffeeId)
  }
  acceptInvitation(){
console.log('estoy aceptando la invitacion')
this.mCoffeeService.acceptInvitation(this.participantInvitations.invitation_id)
this.mCoffeeService.loadParticipantList(this.coffeeId)
  }
  
}
