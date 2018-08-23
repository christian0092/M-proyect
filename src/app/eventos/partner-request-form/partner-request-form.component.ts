import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import { PartnerRequestService } from './partner-request.service';
import {SnackBarServicesService} from '../../services/snack-bar-services.service'

@Component({
  selector: 'app-partner-request-form',
  templateUrl: './partner-request-form.component.html',
  styleUrls: ['./partner-request-form.component.css']
})
export class PartnerRequestFormComponent implements OnInit {
	partner_form:FormGroup;
	send:boolean;
	noError:boolean;
	public loading: boolean = false;

  constructor(private fb:FormBuilder,
   private partnerService:PartnerRequestService,
   private snack:SnackBarServicesService
) {
  	this.partner_form=fb.group({
  		email:['',Validators.compose([Validators.required,Validators.email])],
  		name:['',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(41)])],
  		cellphone:['',Validators.required],
      event_id:['1']})
  	}

  ngOnInit() {
  	this.send=false;
  	this.noError=false;
  }

  onSubmit() {

      if (this.partner_form.valid) {
         this.snack.notificationChange(["info","Enviando.. "])
        this.partnerService.send(this.partner_form.value).subscribe(
          data => {

            this.send=true;
            this.loading = true;
            if(data['success']){
              this.snack.notificationChange(["successful","Formulario enviado!"])
              this.noError=true;
              this.reset();
            } else{
              this.noError=false;
              this.snack.notificationChange(["error","Compruebe que no haya errores y vuelva a intentarlo"])
            }
          },
          error=>{
            this.snack.notificationChange(["error",error.message])
              
          }
        );
      }
    }

 reset() {
    this.partner_form.reset();
     this.loading = false;
  }
  getNoError(){
  	return this.noError;
  }
  getSend(){
  	return this.send;
  }
  close(){
  	this.noError=false;
  	this.send=false;
  	this.partner_form.reset();
  }
}
