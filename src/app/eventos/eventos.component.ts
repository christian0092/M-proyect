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
    new Actividad('9:30','9:15','Sensor de Nivel de Agua en Ruta','Grupo ADTD UTN presenta sensor arduino para medir el agua sobre las baquinas y realizar prevencion','CONGRESS','Disertación a cargo de influenciadores'),
    new Actividad('10:30','9:15','Sensor de Nivel de Agua en Ruta','Grupo ADTD UTN presenta sensor arduino para medir el agua sobre las baquinas y realizar prevencion','WORKSHOP','Resolución de problemáticas junto al panel de expertos'),
    new Actividad('13:30','9:15','Sensor de Nivel de Agua en Ruta','Grupo ADTD UTN presenta sensor arduino para medir el agua sobre las baquinas y realizar prevencion','SUMMIT','Espacio de 10´ para presentar tu idea o prototipo a posibles socios clave'),
  ]

  constructor() { }

  ngOnInit() {

  }


}
