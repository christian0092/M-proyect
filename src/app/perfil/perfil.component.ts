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

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  observable$:Observable<JSON>;
  listaIntereses:Array<Interests>=[];
  ParticipantList:Participant[];

  public myProfile:Profile;
  public myProfile$: Observable<Profile>;

  public person:Person=new Person();

  isMisEvent : Event[];
  //isMisEvent$: Observable<Event[]>;


  public actividad:Activity;

  agenda:Activity[];
  agenda$: Observable<Activity[]>;

  public evento: Event;
  public eventoAccounts: Account[];
  /*public eventoPartners: Partner[];
  public eventoOrganizers: Organizer[];*/

  constructor(
    private userService:UserService,
    private loginService:LoginService,
    private router: Router,
    private eventosServices:EventosService,
    private actividadServices:ActividadService
   ) { }

  ngOnInit() {
    this.loginService.isLogin$().subscribe(
      login=>{
        this.doInit(login);
      });
        this.doInit(this.loginService.isLogin());



  }
  doInit(val:boolean){
    if(val==true){
      this.userService.getMyParticipantList().subscribe(myParticipantList=>this.ParticipantList=myParticipantList);
      this.userService.checkMyParticipantList();


      /*this.userService.getMyProfile().subscribe(myProfile=> this.myProfile=myProfile);

      this.userService.Profile().subscribe(myProfile => {
            this.myProfile = myProfile;
            console.log(this.myProfile);
            this.userService.checkMyProfile(myProfile);

      });*/

      this.myProfile$ = this.userService.getMyProfile2();
      this.myProfile$.subscribe(
          profile => {
            this.myProfile = profile;
            console.log("mira esto")
            console.log( this.myProfile.interests)
             this.person=this.myProfile.person;
             this.myProfile.interests


      });

      //this.userService.checkMyProfile();

    /*  this.isMisEvent$ = this.eventosServices.getMisEventIn$();
      this.isMisEvent$.subscribe(
        isMisEvent => {
          this.isMisEvent = isMisEvent;
          this.loadMisEvento();

        });*/


        this.loadMisEvento();
        this.loadMisDatos();



    }
    else{
     // this.router.navigate(['/home'])
    }
  }
  loadMisDatos(){

   
  }

  loadMisEvento(){
    this.eventosServices.misEvent().subscribe(events => {
          this.isMisEvent=events;
          console.log(this.isMisEvent);
          this.eventosServices.changeMisEventValue(events);

          if(this.isMisEvent.length>0){
            this.loadEvento();
          }
          else{
            this.evento=null;
            this.eventoAccounts=null;
          }
    });
  }

  loadEvento(){
    this.eventosServices.getEvent().subscribe(events => {
          this.evento = events[0];
          console.log(this.evento);
          this.eventoAccounts = this.evento.accounts

          this.loadMiAgenda(this.evento.id);

        });
  }
  loadMiAgenda(data){

    this.agenda$ = this.actividadServices.getActivities();
    this.agenda$.subscribe(
        inActivities => {
          this.agenda = inActivities;
    });

    this.actividadServices.checkActivity(data).subscribe(activities => {
          this.agenda = activities['data'];
          console.log(this.agenda);
          this.actividadServices.checkActivities(this.agenda);


        });
  }

  onAbandonar(data){

     this.eventosServices.deleteEventUser(data).subscribe(
        data => {
          if(data['success']){
            this.loadMisEvento();
          }
        });
  }

  getVer(formato){
    if(formato==7 || formato==8) return false
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

    /*this.observable$=this.userService.getObservable$();
    this.observable$.subscribe(
      user => {
        console.log(user);
        this.name=user['name'];
        this.dni=user['document_type_id'];
        this.fechaDeNacimiento=user['birth_date'];
        this.email = user['email'];
        this.empleo=user['job_level_id'];
        this.estudios=user['study_level_id'];
        this.telefono=user['cellphone'];
        this.pais=user['country_id'];
        this.provincia=user['province_id'];
        this.localidad=user['city_id'];
        this.codigoPostal=user['postal_code'];
        this.calle=user['calle'];
        this.piso =user['piso'];
        this.tipo=user['type'];
        this.listaIntereses=[];
        for(var i=0;i<user['interest'].length;i++)
          {
          this.listaIntereses.push(new Interests(user['interest'][i]['id'],user['interest'][i]['name']));
          }
      });
    this.userService.checkUser();*/
