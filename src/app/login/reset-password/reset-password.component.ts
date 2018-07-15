import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  reset_form:FormGroup;
  send:boolean;
  noError:boolean;
  public loading: boolean = false;

  constructor(
    private fb:FormBuilder,private loginService:LoginService
  ) {
    this.reset_form=fb.group({
  		email:['',Validators.compose([Validators.required,Validators.email])]
    })
  }

  ngOnInit() {
    this.send=false;
    this.noError=false;
  }

    onSubmit() {
        if (this.reset_form.valid) {
          this.loginService.sendResetPassword(this.reset_form.value).subscribe(
            data => {
              this.send=true;
              this.loading = true;
              if(data['success']){
                this.noError=true;
                this.reset();
              } else{
                this.noError=false;
              }
            });
        }
    }

    reset() {
         this.reset_form.reset();
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
         this.reset_form.reset();
    }
}
