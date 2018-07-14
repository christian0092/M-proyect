import { Component, OnInit, Input } from '@angular/core';
import { Participant } from '../models/participant';
import { Actividad } from '../models/actividad';
import { Interests } from '../models/interests';
import {Observable} from 'rxjs/Observable';
import {FormControl} from '@angular/forms';
import {UserService} from '../services/user.service';
import { ParticipantComponent } from '../perfil/participant/participant.component';
import {Profile} from '../models/profile';
import {LoginService} from '../services/login.service'
import {Router} from '@angular/router';


import { EventosService } from '../eventos/eventos.service';
import { ActividadService } from '../eventos/actividad/actividad.service';

import { Activity } from '../models/activity';
import { Event } from '../models/event';
import { Partner } from '../models/partner';
import { Organizer } from '../models/organizer';
import { Account } from '../models/account';
import { Speaker } from '../models/speaker';
import { Event_format } from '../models/event_format';

import { Person } from '../models/person';
import { Organization } from '../models/organization';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  observable$:Observable<JSON>;
  listaIntereses:Array<Interests>=[];

  isLogged : boolean;
  isLogged$: Observable<boolean>;

  public listaAccounts:Account[];

  ParticipantList:Participant[];

  public myProfile:Profile;
  public myProfile$: Observable<Profile>;


  public person:Person=new Person();
  public organization:Organization=new Organization();
  personLogged:boolean=false;
  isMisEvent : Event[];
  //isMisEvent$: Observable<Event[]>;


  public actividad:Activity;

  //public actividades:Activity[];

  agenda:Activity[];
  agenda$: Observable<Activity[]>;

  public evento: Event;
  public eventoAccounts: Account[];

  errorEvento;

  summitLogged;

  constructor(
    private userService:UserService,
    private loginService:LoginService,
    private router: Router,
    private eventosServices:EventosService,
    private actividadServices:ActividadService
   ) { }

  ngOnInit() {

    this.isLogged$ = this.loginService.isLogin$();
    this.isLogged$.subscribe(
      login=>{
        this.doInit(login);
      });

      this.doInit(this.loginService.isLogin());

  }

  doInit(val:boolean){
    if(val==true){

      this.myProfile$ = this.userService.getMyProfile2();
      this.myProfile$.subscribe(
          profile => {
            if (profile!=null) {
             this.myProfile = profile;
             if(profile.organization!=null){
               this.organization=profile.organization
               this.personLogged=false
             }

             if (profile.person!=null) {
               this.person=profile.person
               this.personLogged=true
             }
             if(profile.interests!=null)
               { this.listaIntereses=profile.interests;}
             if(profile.accounts!=null)
               {this.listaAccounts=profile.accounts;}

               this.loadMisEvento();
            }




      });
      this.userService.checkMyProfile();

      this.agenda$ = this.actividadServices.getActivities();
      this.agenda$.subscribe(
          inActivities => {
            this.agenda = inActivities;

      });

    }
    else{
      //this.router.navigate(['/home'])
    }
  }

  loadMisEvento(){
    this.eventosServices.misEvent().subscribe(events => {
          this.isMisEvent=events;

          //this.eventosServices.changeMisEventValue(events);

          if(this.isMisEvent.length>0){
            this.loadEvento();
            this.errorEvento=false;
          }
          else{
            this.evento=null;
            this.eventoAccounts=null;
            this.errorEvento=true;
          }
    });
  }

  getErrorEvento(){
    return this.errorEvento;
  }

  loadEvento(){
    this.eventosServices.getEvent().subscribe(events => {

          this.evento = events[0];
          this.eventoAccounts = this.evento.accounts

          if(events.length>0)
            this.loadMiAgenda(this.evento.id);
        });
  }

  loadMiAgenda(data){


    //this.actividadServices.checkActivity(data).subscribe();
    this.actividadServices.checkActivity(data).subscribe(activities => {
          this.agenda = activities['data'];
          this.actividadServices.checkActivities(this.agenda);
    });

    this.mostrarApartado();

  }
  mostrarApartado(){

    if(this.agenda!=null){
          for(let act of this.agenda){

            if(act.event_format_id==3){
              this.summitLogged=true;
              break;
            }
            else{
              this.summitLogged=false;
            }
          }
        }
  }
  onAbandonar(data){

     this.eventosServices.deleteEventUser(data).subscribe(
        data => {
          if(data['success']){

                  this.errorEvento=true;

                /*  this.actividadServices.checkActivity(data).subscribe(activities => {
                  this.agenda = activities['data'];

                  this.actividadServices.checkActivities(this.agenda);
            });*/

            this.loadMisEvento();
          }
        });
  }

  getVer(formato){
    if(formato==7 || formato==8) return false;
    else return true;
  }

  getActividad (actividad){
    this.actividad=actividad;
    this.actividadServices.onActivityclickchange(this.actividad);

    /*if(this.isLogged && this.subscripto)
      this.checkActivity(this.actividad.id);*/

  }
  verAgendaCompleta(){
    this.router.navigate(['/eventos'])
  }

}
