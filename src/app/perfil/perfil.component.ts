import { Component, OnInit } from '@angular/core';
import { Participant } from '../models/participant';
import { Actividad } from '../models/actividad';
import { Interests } from '../models/interests';
import {Observable} from 'rxjs/Observable';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  listaIntereses:Interests[]=[
  new Interests('1','Progamación'),
  new Interests('2','Robótica'),
  new Interests('3','Tecnología'),
  new Interests('4','Innovación')
  ]
  ParticipantList:Participant[]=[
    new Participant('1','Christian Molina',1),
    new Participant('2','Fernanda Micakosky',1),
    new Participant('3','Jonathan Gomez',2),
    new Participant('4','Angeles Perez Angueria',2),
    new Participant('5','La señora de España',1),
    new Participant('6','Mel Gibson',1),
    new Participant('7','El retutu papa',1),

 	]
  agenda: Actividad[]=[
    new Actividad('9:00','9:15','','','COFFEE MEET','15´ para presentarse con el asistente elegido'),
    new Actividad('9:15','9:45','','','APERTURA','Presentación de II Workshop LATAM #MOVILIDADFUTURA'),
    new Actividad('9:45','10:45','Sensor ','Grupo ADTD UTN presenta sensor ','CONGRESS','Presentación a cargo de influenciadores'),
    new Actividad('10:45','12:45','Sensor','Grupo ADTD UTN presenta sensor ','WORKSHOP','Resolución de problemáticas junto al panel de expertos'),
    new Actividad('12:45','13:30','','','BREAK',''),
    new Actividad('13:30','14:30','Sensor','Grupo ADTD UTN presenta sensor ','SUMMIT','Espacio de 10´ para presentar tu idea o prototipo a posibles socios clave'),
  ]
  constructor() { }

  ngOnInit() {
  }

}
