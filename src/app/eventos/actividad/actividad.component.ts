import { Component, OnInit, Input } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { LoginService } from '../../services/login.service';
//import { Actividad } from '../../models/actividad';
@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.css']
})
export class ActividadComponent implements OnInit {
  @Input() public actividad;
  cabecera;
  isLogged : boolean;
  isLogged$: Observable<boolean>;

  constructor(
      private loginService:LoginService
  ) { }

  ngOnInit() {
    this.isLogged$ = this.loginService.isLogin$();
    this.isLogged$.subscribe(
      isLogged => {
        this.isLogged = isLogged;
      });
    this.loginService.checkLogin();

  }

  onSubmit(){
    /*this.eventosServices.addActivityUser().subscribe(
      data => {
        if (data['data']) {

          console.log(data['data']);
        } else {
          console.log("error");
        }
      }
    );*/
  }
  getFormatExpone(){
    if(this.actividad.event_format.id!=3 && this.actividad.event_format.id!=5 ) return true;
    else return false;
  }
  getFormat(){
    switch(this.actividad.event_format.id){
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

}
