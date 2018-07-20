import { Component, OnInit } from '@angular/core';
import { Participant } from '../models/participant';
import {Observable} from 'rxjs/Observable';
import {FormControl} from '@angular/forms';
import {MCoffeeService} from '../services/m-coffee.service'



@Component({
  selector: 'modal-coffee',
  templateUrl: './modal-coffee.component.html',
  styleUrls: ['./modal-coffee.component.css']
})
export class ModalCoffeeComponent implements OnInit {
	
 	Show:boolean=false;
  ParticipantList:Participant[]
  constructor(private mCoffeeService:MCoffeeService) {

   //console.log(JSON.stringify(this.ParticipantList)); 
 }

  ngOnInit() {
    this.mCoffeeService.getParticipantListObservable$().subscribe(
      data=>{this.ParticipantList=data
             console.log('estoy en el observable'+this.ParticipantList)})
    this.mCoffeeService.getParticipantList()
    console.log('estoy en el oninit'+this.ParticipantList)
  }

  displayshow(){
  	return  this.Show;
  }

  invitation(){

  }

}
