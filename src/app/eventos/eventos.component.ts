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

  agenda: Observable<Actividad[]>=[
    new Actividad('9:00','9:15','Sensor de Nivel de Agua en Ruta','Grupo ADTD UTN presenta sensor arduino para medir el agua sobre las baquinas y realizar prevencion','COFFEE MEET','15 para presentarse con el asistente alegido'),
    new Actividad('9:00','9:15','Sensor de Nivel de Agua en Ruta','Grupo ADTD UTN presenta sensor arduino para medir el agua sobre las baquinas y realizar prevencion','COFFEE MEET','15 para presentarse con el asistente alegido'),
    new Actividad('9:00','9:15','Sensor de Nivel de Agua en Ruta','Grupo ADTD UTN presenta sensor arduino para medir el agua sobre las baquinas y realizar prevencion','COFFEE MEET','15 para presentarse con el asistente alegido'),
    new Actividad('9:00','9:15','Sensor de Nivel de Agua en Ruta','Grupo ADTD UTN presenta sensor arduino para medir el agua sobre las baquinas y realizar prevencion','COFFEE MEET','15 para presentarse con el asistente alegido'),
  ]

  constructor() { }

  ngOnInit() {

  }


}
