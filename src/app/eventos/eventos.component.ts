import { Component, OnInit } from '@angular/core';
import { Activity } from '../models/activity';
import { Actividad } from '../models/actividad';

import { Event } from '../models/event';
import { Partner } from '../models/partner';
import { Organizer } from '../models/organizer';
import { Account } from '../models/account';
import { Speaker } from '../models/speaker';
import { Event_format } from '../models/event_format';

import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms';
import { EventosService } from './eventos.service';
import { ActividadService } from './actividad/actividad.service';
import { LoginService } from '../services/login.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  error = false;
  send = false;
  isLogged: boolean;
  isLogged$: Observable<boolean>;

  isMisEvent: Event[];
  isMisEvent$: Observable<Event[]>;

  /*agenda2: Actividad[]=[
    new Actividad('9:00','9:15','','','COFFEE MEET','15´ para presentarse con el asistente elegido','2','coffe_c.jpg'),
    new Actividad('9:15','9:45','','','APERTURA','Presentación de II Workshop LATAM #MOVILIDADFUTURA','1',''),
    new Actividad('9:45','10:45','Sensor ','Grupo ADTD UTN presenta sensor ','CONGRESS','Presentación a cargo de influenciadores','4','congress_c.jpg'),
    new Actividad('10:45','12:45','Sensor','Grupo ADTD UTN presenta sensor ','WORKSHOP','Resolución de problemáticas junto al panel de expertos','5','workshop_c.jpg'),
    new Actividad('12:45','13:30','','','BREAK','','1',''),
    new Actividad('13:30','14:30','','','SUMMIT','Espacio de 10´ para presentar tu idea o prototipo a posibles socios clave','3','congress_c.jpg'),
  ];*/
  public actividad: Activity;

  public participaActividad = false;
  //public actividades:Activity[];

  actividades: Activity[];
  actividades$: Observable<Activity[]>;

  public evento: Event;
  public eventoAccounts: Account[];
  public eventoPartners: Partner[];
  public eventoOrganizers: Organizer[];

  public agenda: Activity[];
  public agendaSpeakers: Speaker[];

  public subscripto = false;

  constructor(
    private eventosServices: EventosService,
    private actividadServices: ActividadService,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    //this.isMisEvent$ = this.loginService.isMisEvent$();

    this.isLogged$ = this.loginService.isLogin$();
    this.isLogged$.subscribe(
      isLogged => {
        this.isLogged = isLogged;
        if(isLogged==true)
         {
          this.error=false;
          this.subscripto = this.eventosServices.participoEvent(1);
         }


      });
    //this.loginService.checkLogin();
    this.isLogged = this.loginService.isLogin()
    if (this.isLogged == true) {
      this.error = false;
      //console.log(this.subscripto);
      this.subscripto=false;
      this.loadMisEvento();
      //console.log(this.subscripto);
    }
    this.loadEvento();
  }

  getSend() {
    return this.send;
  }

  getError() {
    return this.error;
  }

  resetSend() {
    this.send = false;
    this.error = false;
  }

  checkEvent(data) {
    this.eventosServices.checkEvent(data).subscribe(
      data => {
        if (data['success']) {
          this.subscripto = true;
        } else {
          this.subscripto = false;
        }
      }
    );
  }

  checkActivity(id) {

    //alert('checkActivity'+id);
    //this.participaActividad=false;

    /*this.actividades$ = this.actividadServices.getActivities();
    this.actividades$.subscribe(
        inActivities => {
          this.actividades = inActivities;
    });
    this.actividadServices.checkActivity(this.evento.id).subscribe();*/
    /*this.actividadServices.checkActivity(this.evento.id).subscribe(
      data => {
        if (data['success']) {

          this.actividades=data['data'];

          for(let act of this.actividades){
            if(act.id==id){
              this.participaActividad=true;
              break;
            }
            else{
              this.participaActividad=false;
            }
          }

        } else {
          console.log("error");

        }
      }
    );*/

    /*if(this.actividades!=null){
      for(let act of this.actividades){

        alert('formato'+act.id);
        if(act.id==id){
          this.participaActividad=true;
          break;
        }
        else{
          this.participaActividad=false;
        }
      }
      alert('participaActividad'+this.participaActividad);
    }
    else{
      this.participaActividad=false;
    }*/


  }

  getActividad(actividad) {
    this.actividad = actividad;
    this.actividadServices.onActivityclickchange(this.actividad);

    /*if(this.isLogged==true && this.subscripto==true)
      this.checkActivity(this.actividad.id);*/

  }

  loadEvento() {
    this.eventosServices.getEvent().subscribe(events => {
      this.evento = events[0];

      //console.log(this.evento);

      this.eventoAccounts = this.evento.accounts
      this.eventoPartners = this.evento.partners
      this.eventoOrganizers = this.evento.organizers

      this.loadAgenda(this.evento.id);
      /*if(this.isLogged==true){

        this.subscripto=this.eventosServices.participoEvent(this.evento.id);
      }*/

    });
  }

  loadMisEvento() {

    this.eventosServices.misEvent().subscribe(events => {
      this.eventosServices.changeMisEventValue(events)
      if (events.length > 0) {
        this.subscripto = true;
        //console.log(this.subscripto);
        this.actividadServices.loadMyActivities(events[0].id).subscribe(
          activities => this.actividadServices.ActivitiesChange(activities['data'])
        );
      }
    });
  }

  /*loadMisActividades(id){
    this.actividades$ = this.actividadServices.getActivities();
    this.actividades$.subscribe(
        inActivities => {
          this.actividades = inActivities;
    });

          this.actividadServices.checkActivity(id).subscribe(activities => {
          this.actividades = activities['data'];
          console.log(this.actividades);
          this.actividadServices.checkActivities(this.actividades);


    });*/

  //this.actividadServices.checkActivity(id).subscribe();
  //this.actividadServices.checkActivities(this.actividades);
  /*}*/
  loadAgenda(data) {
    this.eventosServices.getEventActivities(data).subscribe(activities => {
      this.agenda = activities;
      //console.log(this.agenda);
      //this.agendaSpeakers = this.agenda.speakers
    });
  }

  onParticipar(data) {

    if (this.isLogged == true) {
      this.eventosServices.addEventUser(data).subscribe(
        data => {
          if (data['success']) {
            this.subscripto = true;
            this.error = false;
            this.send = true;
          }

        }
      );
    }
    else {
      this.error = true;
      this.send = false;
    }

  }

  onAbandonar(data) {
    if (this.isLogged == true) {
      this.eventosServices.deleteEventUser(data).subscribe(
        data => {
          if (data['success']) {
            this.subscripto = false;
            this.send=false;
            /*this.actividades = [];
            this.actividadServices.checkActivities(this.actividades);*/
          }
        });
    }
    else {
      alert('Debe loguearse para poder Abandonar los Eventos');
    }

  }

  getVer(formato) {

    if (formato == 7 || formato == 8) return false
    else return true;
  }



}
