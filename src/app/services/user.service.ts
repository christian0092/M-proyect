import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Interests } from '../models/interests';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { Participant } from '../models/participant';
import {Profile} from '../models/profile';
import { Actividad } from '../models/actividad';




@Injectable()
export class UserService {
  ///////////////////////////////////Dummy Data///////////////////////////////////////////
   private dummyJson:JSON; 
   private dummyData:string='{"password":"pepitolandia","type":"Empresa","interest":[{"id":"4","name":"Innovacion"},{"id":"3","name":"Tecnologia"},{"id":"1","name":"Progamación"},{"id":"2","name":"Robotica"}] ,"calle":"Regimiento 3 de Caballería 473","piso":"-Departamento-","postal_code":"6400","city_id":"Trenque Lauquen","province_id":"Buenos Aires","country_id":"Argentina","cellphone":"+542392449401","name":"Jonathan","surname":"Gomez","birth_date":"01/01/1876","document_type_id":"37033486","email":"borretumail@ynolose.com","job_level_id":"Empresario","study_level_id":"Universitario"}';
   private dummyInterestList:Interests[]=[
  new Interests('1','Progamación'),
  new Interests('2','Robótica'),
  new Interests('3','Tecnología'),
  new Interests('4','Innovación')]
  private dummyMyParticipantList=[
    new Participant('1','Christian Molina',1),
    new Participant('2','Fernanda Micakosky',1),
    new Participant('3','Jonathan Gomez',2),
    new Participant('4','Angeles Perez Angueria',2),
    new Participant('5','La señora de España',1),
    new Participant('6','Mel Gibson',1),
    new Participant('7','El retutu papa',1)]
    private dummyMyActividad:Actividad[]=[
    new Actividad('9:00','9:15','','','COFFEE MEET','15´ para presentarse con el asistente elegido','',''),
    new Actividad('9:15','9:45','','','APERTURA','Presentación de II Workshop LATAM #MOVILIDADFUTURA','',''),
    new Actividad('9:45','10:45','Sensor ','Grupo ADTD UTN presenta sensor ','CONGRESS','Presentación a cargo de influenciadores','',''),
    new Actividad('10:45','12:45','Sensor','Grupo ADTD UTN presenta sensor ','WORKSHOP','Resolución de problemáticas junto al panel de expertos','',''),
    new Actividad('12:45','13:30','','','BREAK','','',''),
    new Actividad('13:30','14:30','Sensor','Grupo ADTD UTN presenta sensor ','SUMMIT','Espacio de 10´ para presentar tu idea o prototipo a posibles socios clave','',''),
  ]
    private dummyMyProfile:Profile=new Profile("Christian0092@hotmail.com","Christian Enzo Molina","37033486","Estudiante","Ing en sistemas","23/11/1992","+5492392545130","Argentina","Buenos Aires","Trenque Lauquen","6400","Baldovino 1402","N/A","Empresa",this.dummyInterestList, this.dummyMyActividad,"https://twitter.com/ChrissMolinaa","https://www.facebook.com/Chrisenzo0092","https://www.linkedin.com/in/christian-molina-3583b4141/","https://www.instagram.com/chrisenzo0092/")
////////////////////////////////Real Atributes/////////////////////////////////////////////////////////
   private userObservable$ = new Subject<JSON>();
   private user : JSON;
   private myParticipantListObservable$=new Subject<Participant[]>();
   private myParticipantList:Participant[];
   private myProfileObservable$=new Subject<Profile>()
   private myProfile:Profile


  constructor() {
	this.dummyJson=JSON.parse(this.dummyData);   
}
 getUsername(){
 	return (this.dummyJson);
 }
  private changeUserValues(val){
    this.user = val;
    this.userObservable$.next(this.user);
  }
  getObservable$():Observable<JSON>{
      return this.userObservable$.asObservable();
  }
  checkUser(){
      this.changeUserValues(this.dummyJson);  
  }
    getForm(form: FormGroup): FormGroup {
      this.changeUserValues(this.dummyJson);
      if(this.myProfile.tipo=="Persona"){
      form.controls['user'].patchValue( {email:this.myProfile.email});
      form.controls['user'].patchValue( {password_confirmation:this.user['password']});
      form.controls['user'].patchValue( {password:this.user['password']});
      form.controls['person'].patchValue( {name:this.user['name']});
      form.controls['person'].patchValue( {surname:this.user['surname']})
      form.controls['person'].patchValue( {document_number:this.user['document_type_id']})}
      else if(this.myProfile.tipo=="Empresa"){
      form.patchValue( {email:this.myProfile.email});
      form.patchValue( {password_confirmation:this.user['password']});
      form.patchValue( {password:this.user['password']});
      }

   return form
  }

  //////////////////////////////--Participant list--//////////////////////////////////
  private changeMyParticipantList(val:Participant[]){
    this.myParticipantList = val;
    this.myParticipantListObservable$.next(this.myParticipantList);
  }
  getMyParticipantList():Observable<Participant[]>{
    return this.myParticipantListObservable$
  }
  checkMyParticipantList(){
      this.changeMyParticipantList(this.dummyMyParticipantList)
  }
//////////////////////////////////--User Profile--///////////////////////////////////
  private changeMyProfile(val:Profile){
    this.myProfile=val;
    this.myProfileObservable$.next(this.myProfile)
  }
   getMyProfile():Observable<Profile>{
    return this.myProfileObservable$
  }
  checkMyProfile(){
      this.changeMyProfile(this.dummyMyProfile)
  }
  ////////////////////////////--myDiary--//////////////////////////////////////////

}
 /*interface user {
         name:string,
        surname:string,
        birth_date:Date,
        document_number:string,
        phone:string,
        cellphone::string,
        email:string,
        document_type_id: Int16Array,
        study_level_id:Int16Array,
        country_id:Int16Array,
        province_id:Int16Array,
        city_id:Int16Array,
        user_id:Int16Array,
        postal_code:Int16Array
    }
    interface userInterface {
         name:string,
       
    }*/