import { Component, OnInit, Input } from '@angular/core';
import {Profile} from '../../models/profile'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {isFieldValidation} from '../../login/register/registerDecorator'
import { MSummitService} from '../../services/m-summit.service'
import {UserService} from '../../services/user.service'


@Component({
  selector: 'm-summitDisplay',
  templateUrl: './m-summit2.component.html',
  styleUrls: ['./m-summit2.component.css']
})
export class MSummit2Component implements OnInit {
	@Input() myProfile:Profile;
	queryForm:FormGroup
	send:boolean=false
	error:boolean=false
	errorData:string=''
	ok:boolean=false

  constructor(private fb:FormBuilder, private mSummitServices:MSummitService, private userService:UserService) {
  	this.queryForm=fb.group({
  		email:['',Validators.compose([Validators.required,Validators.email])],
  		name:['',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(41)])],
  		phone:['',Validators.required],
      	event_id:['1'],
      	query:['',Validators.required]})


  	}

  ngOnInit() {

  	this.setQueryForm()
    console.log("Estoy en summit")
    console.log(this.myProfile)
  }
 isFieldValid(query:string){
  	return isFieldValidation(query,this.queryForm)
  }
  	setQueryForm(){
  	this.send=false
  	this.error=false
  	this.ok=false
  	this.queryForm.reset()
  	if(this.myProfile!=null){
  	this.queryForm.patchValue({email:this.myProfile.person.email, name:this.myProfile.name, phone:this.myProfile.person.phone})}
    else//if(this.myProfile==null)
        {
         this.userService.getMyProfile2().subscribe(
           myProfile => {this.queryForm.patchValue({email:myProfile.person.email, name:myProfile.name, phone:myProfile.person.phone})
          },
          error=>{this.error=true
                  this.errorData="Ocurrio un error al obtener sus datos, asegurese de estar logueado"}
          ) //calaberi se la come
        }
  	}

  onSubmit() {

      if (this.queryForm.valid) {
      	 this.send=true;
      	 this.error=false;
      this.mSummitServices.send(this.queryForm.value).subscribe(
          data => {

            if(data['status']){
             setTimeout(
             	() => {this.ok=true}, 1000);
             	this.setQueryForm()
             } else{
            this.error=true
      		this.errorData=data['status']
            }
          },
          error =>{ this.send=false
                    this.error=true
                    this.errorData=error['type']
                    console.log(error)
                    }
          );
      }else if(this.queryForm.valid==false){
      	this.error=true
      	this.errorData="Compruebe que esta logueado y que relleno la consulta"
      }
    }

}
