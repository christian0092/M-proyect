import { Component, OnInit, Input } from '@angular/core';
import { Participant} from  '../../models/participant'
import {MCoffeeService} from '../../services/m-coffee.service'


@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.css']
})
export class ParticipantComponent implements OnInit {
@Input() participant:Participant;
@Input() coffeeId:number;
	Show:boolean=false;
  constructor(private mCoffeeService:MCoffeeService) { }

  ngOnInit() {
    //console.log('Estoy en participant: '+this.participant)
  }
 displayshow(){
  	return  this.Show;
  }

  abortInvitation(){
console.log('estoy cancelando la invitacion')
this.mCoffeeService.loadParticipantList(this.coffeeId)
  }
  sendInvitation(){
console.log('estoy enviando la invitacion')
this.mCoffeeService.loadParticipantList(this.coffeeId)
  }
  acceptInvitation(){
console.log('estoy aceptando la invitacion')
this.mCoffeeService.loadParticipantList(this.coffeeId)
  }
  declineInvitation(){
console.log('estoy declinando la invitacion')
this.mCoffeeService.loadParticipantList(this.coffeeId)
  }
}
