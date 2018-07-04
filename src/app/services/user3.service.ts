import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
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
 

@Injectable()
export class UserService {
	/*DUMMY_DATA = [
      {
        name: 'John Lilki',
        surname:'',
        birth_date:'',
        document_number:'',
        phone:'',
        cellphone:'',
        email:'',
        document_type_id:'',
        study_level_id:'',
        country_id:'',
        province_id:'',
        city_id:'',
        user_id:'',
        postal_code:''
      }*/
   private dummy_data:JSON; 
   private test:string='{"email":"christian0092@hotmail.com"}';

  constructor() {
	this.dummy_data=JSON.parse(this.test);
}
 getUsername(){
 	return (this.dummy_data);
 }
}
