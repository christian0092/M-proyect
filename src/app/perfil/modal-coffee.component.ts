import { Component, OnInit } from '@angular/core';
import { Participant } from '../models/participant';
import {Observable} from 'rxjs/Observable';
import {FormControl} from '@angular/forms';



@Component({
  selector: 'modal-coffee',
  templateUrl: './modal-coffee.component.html',
  styleUrls: ['./modal-coffee.component.css']
})
export class ModalCoffeeComponent implements OnInit {
	ParticipantList:Participant[]=[
    new Participant('Christian Molina',0),
    new Participant('Fernanda Micakosky',1),
    new Participant('Jonathan Gomez',2),
    new Participant('Angeles Perez Angueria',2),
    new Participant('La señora de España',0),
    new Participant('Mel Gibson',0),
    new Participant('El retutu papa',1),
    new Participant('Completar cansa',2),
    new Participant('Jhon wick',1),
 	]
 	Show:boolean=false;
  constructor() { 
   console.log(JSON.stringify(this.ParticipantList)); }

  ngOnInit() {
  }
  displayshow(){
  	return  this.Show;
  }

}
