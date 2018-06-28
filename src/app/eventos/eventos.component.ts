import { Component, OnInit } from '@angular/core';
import { Actividad } from '../models/actividad';
import {Observable} from 'rxjs/Observable';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  agenda: Actividad[]=[
    new Actividad('9:00','9:15','','','COFFEE MEET','15´ para presentarse con el asistente elegido'),
    new Actividad('9:15','9:45','','','APERTURA','Presentación de II Workshop LATAM #MOVILIDADFUTURA'),
    new Actividad('9:45','10:45','Sensor ','Grupo ADTD UTN presenta sensor ','CONGRESS','Disertación a cargo de influenciadores'),
    new Actividad('10:45','12:45','Sensor','Grupo ADTD UTN presenta sensor ','WORKSHOP','Resolución de problemáticas junto al panel de expertos'),
    new Actividad('12:45','13:30','','','BREAK',''),
    new Actividad('13:30','14:30','Sensor','Grupo ADTD UTN presenta sensor ','SUMMIT','Espacio de 10´ para presentar tu idea o prototipo a posibles socios clave'),
  ]

  constructor() { }

  ngOnInit() {

  }


}
