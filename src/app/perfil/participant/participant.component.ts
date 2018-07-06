import { Component, OnInit, Input } from '@angular/core';
import { Participant} from  '../../models/participant'


@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.css']
})
export class ParticipantComponent implements OnInit {
@Input() Participant:Participant;
	Show:boolean=false;
  constructor() { }

  ngOnInit() {
  }
 displayshow(){
  	return  this.Show;
  }

  invitation(){

  }
}
