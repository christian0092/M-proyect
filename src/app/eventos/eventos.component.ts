import { Component, OnInit } from '@angular/core';
import { Activity } from '../models/activity';
import { Actividad } from '../models/actividad';
import { Event } from '../models/event';
import {Observable} from 'rxjs/Observable';
import {FormControl} from '@angular/forms';
import { EventosService } from './eventos.service';

//import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {


/*isEvent : boolean;
isLogged$: Observable<boolean>;*/

  agenda2: Actividad[]=[
    new Actividad('9:00','9:15','','','COFFEE MEET','15´ para presentarse con el asistente elegido','2','coffe_c.jpg'),
    new Actividad('9:15','9:45','','','APERTURA','Presentación de II Workshop LATAM #MOVILIDADFUTURA','1',''),
    new Actividad('9:45','10:45','Sensor ','Grupo ADTD UTN presenta sensor ','CONGRESS','Presentación a cargo de influenciadores','4','congress_c.jpg'),
    new Actividad('10:45','12:45','Sensor','Grupo ADTD UTN presenta sensor ','WORKSHOP','Resolución de problemáticas junto al panel de expertos','5','workshop_c.jpg'),
    new Actividad('12:45','13:30','','','BREAK','','1',''),
    new Actividad('13:30','14:30','','','SUMMIT','Espacio de 10´ para presentar tu idea o prototipo a posibles socios clave','3','congress_c.jpg'),
  ];
  public actividad:Activity;
  public evento:Event;
  public agenda={};
  constructor(
    private eventosServices:EventosService,
    //private loginService:LoginService
  ) { }

  ngOnInit() {
    this.loadEvento();

/*
    this.isLogged$ = this.loginService.isLogin$();
    this.isLogged$.subscribe(
      isLogged => {
        this.isLogged = isLogged;
        if(this.isLogged){
          checkEvent():
        }
      });
    this.loginService.checkLogin();*/


  }

  getActividad (actividad){
    this.actividad=actividad;
    console.log(this.actividad);
  }
  getSubscripto (){
    return false;

  }


  loadEvento(){
    this.eventosServices.getEvent().subscribe(
      data => {
        if (data['data']) {
          this.evento = data['data'];
          console.log(this.evento[0].id);
          this.loadAgenda(this.evento[0].id);
        } else {
          console.log("error");
        }
      }
    );
  }

  loadAgenda(data){
    this.eventosServices.getEventActivities(data).subscribe(
      data => {
        if (data['data']) {
          this.agenda = data['data'];
          console.log(this.agenda);
        } else {
          console.log("error");
        }
      }
    );
  }

  onParticipar(data){
   this.eventosServices.addEventUser(data).subscribe(
      data => {
        console.log(data['success']);
      }
    );
  }

  onAbandonar(data){
   this.eventosServices.deleteEventUser(data).subscribe(
      data => {
        console.log(data['success']);
      }
    );
  }

  getVer(formato){
    if(formato==7 || formato==8) return false
    else return true;
  }



  }
