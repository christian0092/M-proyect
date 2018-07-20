import { Component, OnInit, Input } from '@angular/core';
import { Participant} from  '../../models/participant'


@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.css']
})
export class ParticipantComponent implements OnInit {
@Input() participant:Participant;
	Show:boolean=false;
  constructor() { }

  ngOnInit() {
  }
 displayshow(){
  	return  this.Show;
  }

  abortInvitation(){
console.log('estoy cancelando la invitacion')
  }
  sendInvitation(){
console.log('estoy enviando la invitacion')
  }
  acceptInvitation(){
console.log('estoy aceptando la invitacion')
  }
  declineInvitation(){
console.log('estoy declinando la invitacion')
  }
}
