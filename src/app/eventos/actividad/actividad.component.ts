import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LoginService } from '../../services/login.service';
import { Activity } from '../../models/activity';
import { ActividadService } from './actividad.service';
import {SnackBarServicesService} from '../../services/snack-bar-services.service'

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.css']
})

export class ActividadComponent implements OnInit {
  public actividad: Activity;
  public actividades: Activity[];
  @Input() public subscripto: boolean;

  public participaActividad;

  textSummit = "";

  cabecera;
  public send = false;
  public error = false;
  isLogged: boolean;
  isLogged$: Observable<boolean>;

  onActivityclick$: Observable<Activity>;
  myActivity$: Observable<Activity[]>;

  //actividades;
  constructor(
    private loginService: LoginService,
    private actividadServices: ActividadService,
    private snack:SnackBarServicesService
  ) { }

  ngOnInit() {
    this.isLogged$ = this.loginService.isLogin$();
    this.isLogged$.subscribe(
      isLogged => {
        this.isLogged = isLogged;
      });
    this.loginService.checkLogin();
    this.send = false;


    this.onActivityclick$ = this.actividadServices.onActivityclick();
    this.onActivityclick$.subscribe(
      actividad => {
        if (actividad != null) {
          this.actividad = actividad;
          if(this.subscripto)
            this.checkActivity(this.actividad.id);
          else this.participaActividad = false;
        }
      });
  }

  checkActivity(id) {
    this.participaActividad = this.actividadServices.isMyActivity(id);
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

  refreshMyActivities() {
    this.actividadServices.loadMyActivities(this.actividad.event_id).subscribe(
      activities => this.actividadServices.ActivitiesChange(activities['data'])
    );
  }

  onParticipar(data) {
    if (this.subscripto) {
      this.actividadServices.addActivityUser(data).subscribe(
        data => {
          if (data['success']) {
            this.snack.notificationChange(["successful","Estas participando de la Actividad"])
            this.participaActividad = true;
            this.send = true;
            this.error = false;
            this.refreshMyActivities();
          }
          else {
            //console.log(data['message']);
          }
        },
        error=>{
          this.snack.notificationChange(["warning",error.message])
        }
      );
    }
    else {
      this.snack.notificationChange(["warning","Debe Inscribirse al Evento para Participar de una Acividad"])
      this.send = false;
      this.error = true;
    }
  }

  onAbandonar(data) {
    //console.log(data);
    this.actividadServices.deleteActivityUser(data).subscribe(
      data => {
        if (data['success']) {
          this.snack.notificationChange(["info","Has dejado la actividad"])
          this.participaActividad = false;
          this.send = false;
          this.refreshMyActivities();
          /*     this.actividadServices.checkActivity(this.actividad.event_id).subscribe(activities => {
                 this.actividadServices.checkActivities(activities['data']);

               });*/
        }
      }
    );
  }

  getFormatExpone() {
    if (this.actividad == null) return;
    if (this.actividad.event_format_id != 3 && this.actividad.event_format_id != 5) return true;
    else return false;
  }

  getFormat(a) {
    switch (a) {
      case 1:
        this.cabecera = "congress_c.jpg";
        this.textSummit = "";
        break;
      case 2:
        this.cabecera = "workshop_c.jpg";
        this.textSummit = "";
        break;
      case 3:
        this.cabecera = "summit_c.jpg";
        this.textSummit = "En la sección M-SUMMIT de su Perfil encontrará toda la información necesaria";
        break;
      case 5:
        this.cabecera = "coffee_c.jpg";
        this.textSummit = "A partir del 1 de Agosto encontrarás en tu Perfil la sección M_COFFEE para realizar las invitaciones";
        break;
    }
    return true;
  }

  getSubscripto() {
    return false;
  }
}
