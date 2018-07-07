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

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

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
     // this.router.navigate(['/home'])
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