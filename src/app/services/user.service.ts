import { Injectable } from '@angular/core';
import 'rxjs/Rx';

import { Interests } from '../models/interests';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { Participant } from '../models/participant';
import { Profile } from '../models/profile';
import { Actividad } from '../models/actividad';
import { Headers, Http, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable, Subject  } from 'rxjs';




@Injectable()
export class UserService {
  ///////////////////////////////////Dummy Data///////////////////////////////////////////
   //private dummyJson:JSON;
   /*private dummyData:string='{"password":"pepitolandia","type":"Empresa","interest":[{"id":"4","name":"Innovacion"},{"id":"3","name":"Tecnologia"},{"id":"1","name":"Progamación"},{"id":"2","name":"Robotica"}] ,"calle":"Regimiento 3 de Caballería 473","piso":"-Departamento-","postal_code":"6400","city_id":"Trenque Lauquen","province_id":"Buenos Aires","country_id":"Argentina","cellphone":"+542392449401","name":"Jonathan","surname":"Gomez","birth_date":"01/01/1876","document_type_id":"37033486","email":"borretumail@ynolose.com","job_level_id":"Empresario","study_level_id":"Universitario"}';
   private dummyInterestList:Interests[]=[
  new Interests('1','Progamación'),
  new Interests('2','Robótica'),
  new Interests('3','Tecnología'),
  new Interests('4','Innovación')]*/
  private dummyMyParticipantList=[
    new Participant('1','Christian Molina',1),
    new Participant('2','Fernanda Micakosky',1),
    new Participant('3','Jonathan Gomez',2),
    new Participant('4','Angeles Perez Angueria',2),
    new Participant('5','La señora de España',1),
    new Participant('6','Mel Gibson',1),
    new Participant('7','El retutu papa',1)]
    /*private dummyMyActividad:Actividad[]=[
    new Actividad('9:00','9:15','','','COFFEE MEET','15´ para presentarse con el asistente elegido','',''),
    new Actividad('9:15','9:45','','','APERTURA','Presentación de II Workshop LATAM #MOVILIDADFUTURA','',''),
    new Actividad('9:45','10:45','Sensor ','Grupo ADTD UTN presenta sensor ','CONGRESS','Presentación a cargo de influenciadores','',''),
    new Actividad('10:45','12:45','Sensor','Grupo ADTD UTN presenta sensor ','WORKSHOP','Resolución de problemáticas junto al panel de expertos','',''),
    new Actividad('12:45','13:30','','','BREAK','','',''),
    new Actividad('13:30','14:30','Sensor','Grupo ADTD UTN presenta sensor ','SUMMIT','Espacio de 10´ para presentar tu idea o prototipo a posibles socios clave','',''),
  ]*/
    //private dummyMyProfile:Profile=new Profile("Christian0092@hotmail.com","Christian Enzo Molina","37033486","Estudiante","Ing en sistemas","23/11/1992","+5492392545130","Argentina","Buenos Aires","Trenque Lauquen","6400","Baldovino 1402","N/A","Empresa",this.dummyInterestList, this.dummyMyActividad,"https://twitter.com/ChrissMolinaa","https://www.facebook.com/Chrisenzo0092","https://www.linkedin.com/in/christian-molina-3583b4141/","https://www.instagram.com/chrisenzo0092/")
////////////////////////////////Real Atributes/////////////////////////////////////////////////////////
   private userObservable$ = new Subject<JSON>();
   private user : JSON;
   private myParticipantListObservable$=new Subject<Participant[]>();
   private myParticipantList:Participant[];

   private myProfileObservable$=new Subject<Profile>()
   private myProfile:Profile


  constructor(private http: Http) {
	//this.dummyJson=JSON.parse(this.myProfile);
}
 /*getUsername(){
 	return (this.dummyJson);
}*/
  private changeUserValues(val){
    this.user = val;
    this.userObservable$.next(this.user);
  }
  getObservable$():Observable<JSON>{
      return this.userObservable$.asObservable();
  }
  /*checkUser(){
      this.changeUserValues(this.dummyJson);
  }*/
    getForm(form: FormGroup, profile:Profile): FormGroup {
      this.myProfile=profile
      console.log("editando perfil")
      if(profile.organization!=null){
               form=this.chargeFormOrganizationProfile(form,profile)
              
             }

             if (profile.person!=null) {
              form=this.chargeFormPersonProfile(form,profile)
              }

   return form
 }

chargeFormOrganizationProfile(form:FormGroup, profile:Profile):FormGroup{
   form.controls['user'].patchValue( {email:this.myProfile.organization.email});
              form.controls['user'].patchValue( {password:'pepito'});
              form.controls['user'].patchValue( {password_confirmation:'pepito'});
              form.controls['organization'].patchValue( {name:this.myProfile.organization.name});
              form.controls['organization'].patchValue( {phone:this.myProfile.organization.phone})
              form.controls['organization'].patchValue( {country_id:this.myProfile.organization.country_id})
              form.controls['organization'].patchValue( {province:this.myProfile.organization.province})                          
              form.controls['organization'].patchValue( {city:this.myProfile.organization.city})
              form.controls['organization'].patchValue( {street:this.myProfile.organization.street})
              form.controls['organization'].patchValue( {number:this.myProfile.organization.number})
              form.controls['organization'].patchValue( {postal_code:this.myProfile.organization.postal_code})
              form.controls['organization'].patchValue( {floor:this.myProfile.organization.floor})
              form.controls['organization'].patchValue( {dept:this.myProfile.organization.dept})
              form.controls['organization'].patchValue( {terms:true})
              form.controls['organization'].patchValue( { share_data:this.myProfile.organization.share_data})
              form.controls['organization'].patchValue( { contact_name:this.myProfile.organization.contact_name})              
              form.controls['organization'].patchValue( { contact_phone:this.myProfile.organization.contact_phone})
              

             if(profile.interests!=null){
              for (var i =  form['controls']['organization']['controls']['interests']['controls'].length - 1; i >= 0; i--) {
                for (var j = profile.interests.length - 1; j >= 0; j--) {
                
              if(profile.interests[j].id==form['controls']['organization']['controls']['interests']['controls'][i]['controls']['id'].value)
              {             
               form['controls']['organization']['controls']['interests']['controls'][i].patchValue({checked: true, id: profile.interests[j].id, label: profile.interests[j].name})
                }}
              }
               }
             if(profile.accounts!=null)
               {for (var i =  form['controls']['organization']['controls']['accounts']['controls'].length - 1; i >= 0; i--) {
                for (var j = profile.accounts.length - 1; j >= 0; j--) {
                
                
              if(profile.accounts[j].id==form['controls']['organization']['controls']['accounts']['controls'][i]['controls']['id'].value)
              {             
               form['controls']['organization']['controls']['accounts']['controls'][i].patchValue({value: profile.accounts[j].pivot.name})
                }}
              }
             
 }
 return form}

 chargeFormPersonProfile(form:FormGroup, profile:Profile):FormGroup{
   form.controls['user'].patchValue( {email:this.myProfile.person.email});
              form.controls['user'].patchValue( {password:'pepito'});
               form.controls['user'].patchValue( {password_confirmation:'pepito'});
              form.controls['person'].patchValue( {name:this.myProfile.person.name});
              form.controls['person'].patchValue( {surname:this.myProfile.person.surname})
              form.controls['person'].patchValue( {birth_date:this.myProfile.person.birth_date})
              form.controls['person'].patchValue( {document_number:this.myProfile.person.document_number})
              form.controls['person'].patchValue( {profession_id:this.myProfile.person.profession_id})
              form.controls['person'].patchValue( {study_level_id:this.myProfile.person.study_level_id})
              form.controls['person'].patchValue( {phone:this.myProfile.person.phone})
              form.controls['person'].patchValue( {country_id:this.myProfile.person.country_id})
              form.controls['person'].patchValue( {province:this.myProfile.person.province})                          
              form.controls['person'].patchValue( {city:this.myProfile.person.city})
              form.controls['person'].patchValue( {street:this.myProfile.person.street})
              form.controls['person'].patchValue( {number:this.myProfile.person.number})
              form.controls['person'].patchValue( {postal_code:this.myProfile.person.postal_code})
              form.controls['person'].patchValue( {floor:this.myProfile.person.floor})
              form.controls['person'].patchValue( {dept:this.myProfile.person.dept})
              form.controls['person'].patchValue( {terms:true})
              form.controls['person'].patchValue( { share_data:this.myProfile.person.share_data})

             if(profile.interests!=null){
              for (var i =  form['controls']['person']['controls']['interests']['controls'].length - 1; i >= 0; i--) {
                for (var j = profile.interests.length - 1; j >= 0; j--) {
                
              if(profile.interests[j].id==form['controls']['person']['controls']['interests']['controls'][i]['controls']['id'].value)
              {             
               form['controls']['person']['controls']['interests']['controls'][i].patchValue({checked: true, id: profile.interests[j].id, label: profile.interests[j].name})
                }}
              }
               }
             if(profile.accounts!=null)
               {for (var i =  form['controls']['person']['controls']['accounts']['controls'].length - 1; i >= 0; i--) {
                for (var j = profile.accounts.length - 1; j >= 0; j--) {
                
                
              if(profile.accounts[j].id==form['controls']['person']['controls']['accounts']['controls'][i]['controls']['id'].value)
              {             
               form['controls']['person']['controls']['accounts']['controls'][i].patchValue({value: profile.accounts[j].pivot.name})
                }}
              }
             
 }
 return form}

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
    this.getMyProfile2().subscribe(data=>this.changeMyProfile(data))
    //this.Profile().subscribe(data=>this.changeMyProfile(data))

  }
  /*Profile(){
    const header = new Headers({ 'Content-Type': 'application/json','Authorization': 'Bearer' + localStorage.getItem('token')});

    return this.http.get(environment.apiUrl + 'persons/get', { headers: header })
    .map((response: Response) => response.json());
  }*/
  getMyProfile2():Observable<Profile>
  {
    const header = new Headers({ 'Content-Type': 'application/json','Authorization': 'Bearer' + localStorage.getItem('token')});

    return this.http.get(environment.apiUrl + 'persons/get', { headers: header })
    .map((res: Response) =>this.myProfile=new Profile().deserialize(res.json().data)
    //.map((profile: Profile) => new Profile().deserialize(Profile) )
    );

  }
}
