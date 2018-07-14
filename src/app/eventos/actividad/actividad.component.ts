import { Component, OnInit, Input } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { LoginService } from '../../services/login.service';
import { Activity } from '../../models/activity';
import { ActividadService } from './actividad.service';

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.css']
})
export class ActividadComponent implements OnInit {
  //@Input() public actividad:Activity;
  public actividad:Activity;
public actividades:Activity[];
  //@Input() public participaActividad:boolean;
  @Input() public subscripto:boolean;

public participaActividad;

  textSummit="";

  cabecera;
  public send=false;
  public error=false;
  isLogged : boolean;
  isLogged$: Observable<boolean>;

  onActivityclick$: Observable<Activity>;

  //actividades;
  constructor(
      private loginService:LoginService,
      private actividadServices:ActividadService
  ) { }

  ngOnInit() {
    this.isLogged$ = this.loginService.isLogin$();
    this.isLogged$.subscribe(
      isLogged => {
        this.isLogged = isLogged;
      });
    this.loginService.checkLogin();
    this.send=false;


    this.onActivityclick$ = this.actividadServices.onActivityclick();
    this.onActivityclick$.subscribe(
       actividad => {

         if(actividad!=null){
           this.actividad = actividad;
           console.log('estoy en actividad particular '+actividad.event_id);

           this.actividadServices.checkActivity(actividad.event_id).subscribe(
             activities => {
                 this.actividades = activities['data'];
                 this.checkActivity(actividad.id);

               });
         }
      });



  }

  checkActivity(id){

      if(this.actividades!=null){
        for(let act of this.actividades){

          if(act.id==id){
            this.participaActividad=true;
            break;
          }
          else{
            this.participaActividad=false;
          }
        }
      }
      else{
        this.participaActividad=false;
      }


  }
  /*checkActivity(){

    this.actividadServices.checkActivity(actividad.event_id).subscribe(
      data => {
        if (data['success']) {
          this.actividades=data['data'];
          console.log(data['data']);

        } else {
          console.log("error");

        }
      }
    );
  }*/
  getSend(){
    return this.send;
  }
  getError(){
    return this.error;
  }
  resetSend(){
    this.send=false;
    this.error=false;
  }
  onParticipar(data){

    if(this.subscripto){
      this.actividadServices.addActivityUser(data).subscribe(
         data => {
           if(data['success']){
             this.participaActividad=true;
             this.send=true;
            this.error=false;
             console.log(data['message']);
           }
           else{
             console.log(data['message']);
           }
         }
       );
    }
    else{
      this.send=false;
      this.error=true;
      //alert("Debe Inscribirse al Evento para Participar de una Acividad");
    }

  }

  onAbandonar(data){

    console.log(data);
   this.actividadServices.deleteActivityUser(data).subscribe(
      data => {
        if(data['success']){
          this.participaActividad=false;
          this.send=false;

              this.actividadServices.checkActivity(this.actividad.event_id).subscribe(activities => {
                this.actividadServices.checkActivities(activities['data']);

              });
        }
      }
    );
  }
  getFormatExpone(){

    if(this.actividad == null)return;
    if(this.actividad.event_format_id!=3 && this.actividad.event_format_id!=5 ) return true;
    else return false;
  }
  getFormat(a){
    switch(a){
      case 1:
        this.cabecera="congress_c.jpg";
        this.textSummit="";
        break;
      case 2:
        this.cabecera="workshop_c.jpg";
        this.textSummit="";
        break;
      case 3:
        this.cabecera="summit_c.jpg";
        this.textSummit="En la sección M-SUMMIT de su Perfil encontrará toda la información necesaria";
        break;
      case 5:
        this.cabecera="coffee_c.jpg";
        this.textSummit="";
        break;
    }
    return true;
  }

  getSubscripto (){
    return false;

  }

}
