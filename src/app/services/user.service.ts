import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Interests } from '../models/interests';

@Injectable()
export class UserService {
   private dummyJson:JSON; 
   private dummyData:string='{"interest":[{"id":"4","name":"Innovacion"},{"id":"3","name":"Tecnologia"},{"id":"1","name":"Progamación"},{"id":"2","name":"Robotica"}] ,"calle":"Regimiento 3 de Caballería 473","piso":"-Departamento-","postal_code":"6400","city_id":"Trenque Lauquen","province_id":"Buenos Aires","country_id":"Argentina","cellphone":"+542392449401","name":"Jonathan Gomez","birth_date":"01/01/1876","document_type_id":"37033486","email":"borretumail@ynolose.com","job_level_id":"Empresario","study_level_id":"Universitario"}';
   private dummyInterestList:Interests[]=[
  new Interests('1','Progamación'),
  new Interests('2','Robótica'),
  new Interests('3','Tecnología'),
  new Interests('4','Innovación')
  ]

   private userObservable$ = new Subject<JSON>();
   private user : JSON;


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