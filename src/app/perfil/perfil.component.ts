import { Component, OnInit, Input,ViewChild, ElementRef } from '@angular/core';
import { Participant } from '../models/participant';
import { Actividad } from '../models/actividad';
import { Interests } from '../models/interests';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ParticipantComponent } from '../perfil/participant/participant.component';
import { Profile } from '../models/profile';
import { LoginService } from '../services/login.service'
import { Router, NavigationEnd } from '@angular/router';


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
import { Subscription } from 'rxjs';

import {onFileChange, checkSize} from '../Decorators/fileUploadDecorator'
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {maxFileSize} from '../customValidators/customValidators'


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  observable$: Observable<JSON>;
  listaIntereses: Array<Interests> = [];
  isLogged: boolean;
  isLogged$: Observable<boolean>;

  public listaAccounts: Account[];
  ParticipantList: Participant[];

  public myProfile: Profile;
  public myProfile$: Observable<Profile>;

  public person: Person = new Person();
  public organization: Organization = new Organization();
  personLogged: boolean = false;
  isMisEvent: Event[];
  public actividad: Activity;
  agenda: Activity[];
  agenda$: Observable<Activity[]>;

  public evento: Event;
  public eventoAccounts: Account[];
  errorEvento;
  public summitLogged;

   @ViewChild('avatarInput') avatarInput: ElementRef;
   avatarFile:File
   formAvatar:FormGroup;

  constructor(
    private userService: UserService,
    private loginService: LoginService,
    private router: Router,
    private eventosServices: EventosService,
    private actividadServices: ActividadService,
    private fb: FormBuilder
  ) {
  this.createAvatarForm() }

  ngOnInit() {
    this.isLogged$ = this.loginService.isLogin$();
    this.isLogged$.subscribe(login => { this.isLogged = login; });
    this.isLogged = this.loginService.isLogin()
    this.doInit();
  }

  doInit() {
    if (this.isLogged == true) {
      this.myProfile$ = this.userService.getMyProfile();
      this.myProfile$.subscribe(profile => { this.loadProfile(profile) });
      // this.userService.changeMyProfile()
      this.myProfile = this.userService.getProfile()
      this.loadProfile(this.myProfile)
      this.loadMisEvento();
      this.agenda$ = this.actividadServices.subscribeActivitiesObserver();
      this.agenda$.subscribe(inActivities => { this.agenda = inActivities; });
    }
    else {
      //this.router.navigate(['/home'])
    }
  }

  loadProfile(profile: Profile) {
    if (profile != null) {
      this.myProfile = profile;
      if (profile.organization != null) {
        this.organization = profile.organization
        this.personLogged = false
      }
      if (profile.person != null) {
        this.person = profile.person
        this.personLogged = true
      }
      if (profile.interests != null) { this.listaIntereses = profile.interests; }
      if (profile.accounts != null) { this.listaAccounts = profile.accounts; }
    }
  }

  loadMisEvento() {
    this.eventosServices.misEvent().subscribe(events => {
      this.isMisEvent = events;
      if (this.isMisEvent.length > 0) {
        this.loadEvento();
        this.errorEvento = false;
      }
      else {
        this.evento = null;
        this.eventoAccounts = null;
        this.errorEvento = true;
      }
    });
  }

  getErrorEvento() {
    return this.errorEvento;
  }

  loadEvento() {
    this.eventosServices.getEvent().subscribe(events => {
      this.evento = events[0];
      this.eventoAccounts = this.evento.accounts
      this.agenda = this.actividadServices.getMyActivities();
      if (this.agenda == null) {
        this.actividadServices.loadMyActivities(this.evento.id).subscribe(
          activities => {
            this.agenda = activities['data']
            this.actividadServices.ActivitiesChange(activities['data'])
          }
        );
      }
      this.summitLogged = this.actividadServices.hasSummit();
    });
  }
  /*
    mostrarApartado() {
      if (this.agenda != null) {
        let act = this.agenda.find(x => x.event_format_id === 3);
        if (act !== undefined) {
          if (act.event_format_id == 3) {
            this.summitLogged = true;
            return;
          }
        }
      }
      this.summitLogged = false;
    }*/

  onAbandonar(data) {
    this.eventosServices.deleteEventUser(data).subscribe(
      data => {
        if (data['success']) {
          this.errorEvento = true;
          this.summitLogged=false;
          this.agenda = [];
          this.eventosServices.changeMisEventValue([]);
          this.actividadServices.ActivitiesChange([]);
          this.loadMisEvento();
        }
      });
  }

  getVer(formato) {
    if (formato == 7 || formato == 8) return false;
    else return true;
  }

  getActividad(actividad) {
    this.actividad = actividad;
    this.actividadServices.onActivityclickchange(this.actividad);
  }

  verAgendaCompleta() {
    this.router.navigate(['/eventos'])
  }
  onFileChange(event) {

    let {file:avatarFile, form:formAvatar}=onFileChange(event,this.avatarFile,this.formAvatar)
    this.avatarFile=avatarFile
    this.formAvatar=formAvatar
    //console.log(this.formAvatar)
    //console.log(this.avatarFile)
    //console.log(this.formAvatar.controls['fileData'].get('fileSize').invalid)
  }
  createAvatarForm(){
    this.formAvatar=this.fb.group({  
   fileData: this.fb.group({
        fileName: [''],
        fileType: [''],
        fileSize: ['', Validators.compose([Validators.required, maxFileSize(1024*1024*15)])],
      })
    })}
    checkSize(){
     return checkSize('fileData','fileSize',this.formAvatar)}}
      
 

