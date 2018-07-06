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
    new Participant('1','Christian Molina',1),
    new Participant('2','Fernanda Micakosky',1),
    new Participant('3','Jonathan Gomez',2),
    new Participant('4','Angeles Perez Angueria',2),
    new Participant('5','La señora de España',1),
    new Participant('6','Mel Gibson',1),
    new Participant('7','El retutu papa',1),
    new Participant('8','Completar cansa',2),
    new Participant('9','Jhon wick',1),
    new Participant('1','Christian Molina',1),
    new Participant('2','Fernanda Micakosky',1),
    new Participant('3','Jonathan Gomez',2),
    new Participant('4','Angeles Perez Angueria',2),
    new Participant('5','La señora de España',1),
    new Participant('1','Christian Molina',1),
    new Participant('2','Fernanda Micakosky',1),
    new Participant('3','Jonathan Gomez',2),
    new Participant('4','Angeles Perez Angueria',2),
    new Participant('5','La señora de España',1),
    new Participant('6','Mel Gibson',1),
    new Participant('7','El retutu papa',1),
    new Participant('8','Completar cansa',2),
    new Participant('9','Jhon wick',1),
    new Participant('1','Christian Molina',1),
    new Participant('2','Fernanda Micakosky',1),
    new Participant('3','Jonathan Gomez',2),
    new Participant('4','Angeles Perez Angueria',2),
    new Participant('5','La señora de España',1),
    new Participant('1','Christian Molina',1),
    new Participant('2','Fernanda Micakosky',1),
    new Participant('3','Jonathan Gomez',2),
    new Participant('4','Angeles Perez Angueria',2),
    new Participant('5','La señora de España',1),
    new Participant('6','Mel Gibson',1),
    new Participant('7','El retutu papa',1),
    new Participant('8','Completar cansa',2),
    new Participant('9','Jhon wick',1),
    new Participant('1','Christian Molina',1),
    new Participant('2','Fernanda Micakosky',1),
    new Participant('3','Jonathan Gomez',2),
    new Participant('4','Angeles Perez Angueria',2),
    new Participant('5','La señora de España',1),
 	]
 	Show:boolean=false;
  constructor() {
   //console.log(JSON.stringify(this.ParticipantList)); 
 }

  ngOnInit() {
  }

  displayshow(){
  	return  this.Show;
  }

  invitation(){

  }

}
