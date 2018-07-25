import { Component, OnInit,Input } from '@angular/core';
import { Participant } from '../models/participant';
import { ParticipantInvitations } from '../models/ParticipantInvitations';
import {Observable} from 'rxjs/Observable';
import {FormControl} from '@angular/forms';
import {MCoffeeService} from '../services/m-coffee.service'



@Component({
  selector: 'modal-coffee',
  templateUrl: './modal-coffee.component.html',
  styleUrls: ['./modal-coffee.component.css']
})
export class ModalCoffeeComponent implements OnInit {
	@Input() coffeeId:number;
 	Show:boolean=false;
  ParticipantList:Participant[]
  ParticipantInvitationsList:ParticipantInvitations[]
  constructor(private mCoffeeService:MCoffeeService) {

   //console.log(JSON.stringify(this.ParticipantList)); 
 }

  ngOnInit() {
    //console.log('la id del evento es: '+ this.coffeeId)
    this.mCoffeeService.getParticipantListObservable$().subscribe(
      data=>{this.ParticipantList=data
             console.log('estoy actualizando participantes')
           })
    this.mCoffeeService.getParticipantList(this.coffeeId)
    //console.log('estoy en el oninit'+this.ParticipantList)
     //console.log('la id del evento es: '+ this.coffeeId)
    this.mCoffeeService.getParticipantInvitationsListObservable$().subscribe(
      data=>{
        console.log('estoy actualizando invitaciones')
        this.ParticipantInvitationsList=data
            
           })
    this.mCoffeeService.getParticipantInvitationsList(this.coffeeId)
    //console.log('estoy en el oninit'+this.ParticipantList)
  }

  displayshow(){
  	return  this.Show;
  }

  invitation(){

  }

}
