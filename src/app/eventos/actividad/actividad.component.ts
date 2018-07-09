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
  @Input() public actividad:Activity;
  @Input() public participaActividad:boolean;
  @Input() public subscripto:boolean;
  cabecera;
  public send=false;
  public error=false;
  isLogged : boolean;
  isLogged$: Observable<boolean>;
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
   this.actividadServices.deleteActivityUser(data).subscribe(
      data => {
        if(data['success']){
          this.participaActividad=false;
          this.send=false;
        }
      }
    );
  }
  getFormatExpone(){
    if(this.actividad.event_format_id!=3 && this.actividad.event_format_id!=5 ) return true;
    else return false;
  }
  getFormat(a){
    switch(a){
      case 1:
        this.cabecera="congress_c.jpg";
        break;
      case 2:
        this.cabecera="workshop_c.jpg";
        break;
      case 3:
        this.cabecera="summit_c.jpg";
        break;
      case 5:
        this.cabecera="coffee_c.jpg";
        break;
    }
    return true;
  }

  getSubscripto (){
    return false;

  }

}
