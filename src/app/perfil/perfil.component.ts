import { Component, OnInit, Input } from '@angular/core';
import { Participant } from '../models/participant';
import { Actividad } from '../models/actividad';
import { Interests } from '../models/interests';
import {Observable} from 'rxjs/Observable';
import {FormControl} from '@angular/forms';
<<<<<<< HEAD
=======
import {UserService} from '../services/user.service';
import { ParticipantComponent } from '../perfil/participant/participant.component';
import {Profile} from '../models/profile';
import {LoginService} from '../services/login.service'
import {Router} from '@angular/router';
>>>>>>> 7ecc4c8769b9d815d77d057a8173104d3501b8c3

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

<<<<<<< HEAD
  listaIntereses:Interests[]=[
  new Interests('1','Progamación'),
  new Interests('2','Robótica'),
  new Interests('3','Tecnología'),
  new Interests('4','Innovación')
  ]
  ParticipantList:Participant[]=[
    new Participant('1','Christian Molina',1),
    new Participant('2','Fernanda Micakosky',1),
    new Participant('3','Jonathan Gomez',2),
    new Participant('4','Angeles Perez Angueria',2),
    new Participant('5','La señora de España',1),
    new Participant('6','Mel Gibson',1),
    new Participant('7','El retutu papa',1),
 	]
  agenda: Actividad[]=[
    new Actividad('9:00','9:15','','','COFFEE MEET','15´ para presentarse con el asistente elegido','5','workshop_c.jpg'),
    new Actividad('9:15','9:45','','','APERTURA','Presentación de II Workshop LATAM #MOVILIDADFUTURA','5','workshop_c.jpg'),
    new Actividad('9:45','10:45','Sensor ','Grupo ADTD UTN presenta sensor ','CONGRESS','Presentación a cargo de influenciadores','5','workshop_c.jpg'),
    new Actividad('10:45','12:45','Sensor','Grupo ADTD UTN presenta sensor ','WORKSHOP','Resolución de problemáticas junto al panel de expertos','5','workshop_c.jpg'),
    new Actividad('12:45','13:30','','','BREAK','','5','workshop_c.jpg'),
    new Actividad('13:30','14:30','Sensor','Grupo ADTD UTN presenta sensor ','SUMMIT','Espacio de 10´ para presentar tu idea o prototipo a posibles socios clave','5','workshop_c.jpg'),
  ]
  constructor() { }

  ngOnInit() {
  }

}
=======
  observable$:Observable<JSON>;
  listaIntereses:Array<Interests>=[]; 
  ParticipantList:Participant[];
  myProfile:Profile;
  agenda: Actividad[];
  
  constructor( private userService:UserService,private loginService:LoginService, private router: Router) { }

  ngOnInit() {
    this.loginService.isLogin$().subscribe(login=>this.doInit(login))
        this.doInit(this.loginService.isLogin());
   
    
  }
  doInit(val:boolean){
    console.log("Estoy"+val)
    if(val==true){
    this.userService.getMyParticipantList().subscribe(myParticipantList=>this.ParticipantList=myParticipantList);
    this.userService.checkMyParticipantList();
    this.userService.getMyProfile().subscribe(myProfile=> this.myProfile=myProfile)
    this.userService.checkMyProfile();}
    else{
      this.router.navigate(['/home'])
    }
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
>>>>>>> 7ecc4c8769b9d815d77d057a8173104d3501b8c3
