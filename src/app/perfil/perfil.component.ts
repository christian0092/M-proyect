import { Component, OnInit, Input } from '@angular/core';
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
  summitLogged;

  constructor(
    private userService: UserService,
    private loginService: LoginService,
    private router: Router,
    private eventosServices: EventosService,
    private actividadServices: ActividadService
  ) { }

  ngOnInit() {
    this.isLogged$ = this.loginService.isLogin$();
    this.isLogged$.subscribe(login => { this.isLogged = login; });
    this.isLogged = this.loginService.isLogin()
    this.doInit();    
  }

  doInit() {
    if (this.isLogged == true) {
      this.myProfile$ = this.userService.getMyProfile2();
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
      //this.summitLogged = this.actividadServices.hasSummit();
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
          this.agenda = [];
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

}
