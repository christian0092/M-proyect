import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import { PartnerRequestService } from './partner-request.service';

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

  constructor(private fb:FormBuilder, private partnerService:PartnerRequestService) {
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
        this.partnerService.send(this.partner_form.value).subscribe(
          data => {
            this.send=true;
            this.loading = true;
            if(data['status']){              
              this.noError=true;
              this.reset();
            } else{
              this.noError=false;
            }
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
