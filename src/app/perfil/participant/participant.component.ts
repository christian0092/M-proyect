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
	Show:boolean=false;
  constructor(private mCoffeeService:MCoffeeService) { }

  ngOnInit() {
  }
 displayshow(){
  	return  this.Show;
  }

  abortInvitation(){
console.log('estoy cancelando la invitacion')
this.mCoffeeService.loadParticipantList()
  }
  sendInvitation(){
console.log('estoy enviando la invitacion')
this.mCoffeeService.loadParticipantList()
  }
  acceptInvitation(){
console.log('estoy aceptando la invitacion')
this.mCoffeeService.loadParticipantList()
  }
  declineInvitation(){
console.log('estoy declinando la invitacion')
this.mCoffeeService.loadParticipantList()
  }
}
