import { Component, OnInit, Input } from '@angular/core';
import {Profile} from '../../models/profile'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {isFieldValidation} from '../../login/register/registerDecorator'
import { MSummitService} from '../../services/m-summit.service'
import {FileServiceService}from'../../services/file-service.service'
import {SnackBarServicesService} from '../../services/snack-bar-services.service'



@Component({
  selector: 'm-summitDisplay',
  templateUrl: './m-summit2.component.html',
  styleUrls: ['./m-summit2.component.css']
})
export class MSummit2Component implements OnInit {
	queryForm:FormGroup
	send:boolean=false
	error:boolean=false
	errorData:string=''
	ok:boolean=false

  constructor(private fb:FormBuilder,
   private mSummitServices:MSummitService,
    private fileServices:FileServiceService,
    private snack:SnackBarServicesService
    ) {
  	this.queryForm=fb.group({
      	event_id:['',Validators.required],
      	query:['',Validators.required]})


  	}
    download(){
      this.snack.notificationChange(["info","Descargando Template.."])
      this.fileServices.downloadFile()

    }
  ngOnInit() {

  	this.queryForm.get('event_id').patchValue("1")
    //console.log("Estoy en summit")

  }
 isFieldValid(query:string){
  	return isFieldValidation(query,this.queryForm)
  }
  	setQueryForm(){
  	this.send=false
  	this.error=false
  	this.ok=false
  	this.queryForm.reset()
    this.queryForm.get('event_id').patchValue("1")
  }


  onSubmit() {

      if (this.queryForm.valid) {
      	 this.send=true;
      	 this.error=false;
         this.snack.notificationChange(["info","Enviando.."])
      this.mSummitServices.send(this.queryForm.value).subscribe(
          data => {

            if(data['success']){
               this.snack.notificationChange(["successful","Su consulta se ha enviado!"])
             	this.setQueryForm()
               this.ok=true
               //console.log(data['message'])
             } else{
               this.snack.notificationChange(["error",data['message']])
            this.error=true
      		this.errorData=data['message']
            }
          },
          error =>{ this.send=false
                    this.error=true
                    this.errorData=error['message']
                    this.snack.notificationChange(["error",error['message']])
                    //console.log(error)
                    }
          );
      }else if(this.queryForm.valid==false){
      	this.error=true
      	this.errorData="Compruebe que esta logueado y que relleno la consulta"
        this.snack.notificationChange(["error","Compruebe que esta logueado y que relleno la consulta"])
      }
    }

}
