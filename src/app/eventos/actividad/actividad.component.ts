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
  cabecera;
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
        /*if(isLogged){
          this.checkActivity();
        }
        else{

        }*/
      });
    this.loginService.checkLogin();

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
  onParticipar(data){
   this.actividadServices.addActivityUser(data).subscribe(
      data => {
        console.log(data['success']);
      }
    );
  }

  onAbandonar(data){
   this.actividadServices.deleteActivityUser(data).subscribe(
      data => {
        console.log(data['success']);
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
