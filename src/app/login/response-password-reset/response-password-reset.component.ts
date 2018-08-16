import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { passwordConfirming, passwordMatchValidator, validateAllFormFields, trueCheck } from '../../customValidators/customValidators';
import { UserService } from '../../services/user.service';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-response-password-reset',
  templateUrl: './response-password-reset.component.html',
  styleUrls: ['./response-password-reset.component.css']
})
export class ResponsePasswordResetComponent implements OnInit {

  public code;
    formulario: FormGroup;

    send: boolean=false;
    error: boolean=false;
    success: boolean=false;
    errorInfo: string="Error";
    formSubmitAttempt: boolean;

      constructor(
        protected fp: FormBuilder,
        private loginServices: LoginService,
          private router: Router,
          private route:ActivatedRoute,
      ) { }

      ngOnInit() {
        /*this.code=this.route.snapshot.paramMap.get('code');*/

        this.route.queryParams.subscribe(params=>{
          this.code=params['token']
        });
        this.createForm();
      }

      createForm() {
        this.formulario = this.fp.group({
            email: [null, Validators.compose([Validators.required, Validators.email])],
            resetToken: [this.code],
            password: [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(20)])],
            password_confirmation: [null, Validators.compose([Validators.required, passwordConfirming])],
        }, { validators: passwordMatchValidator });

      }


        isFieldValid(field: string) {
          return (!this.formulario.get(field).valid && this.formulario.get(field).touched) ||
            (this.formulario.get(field).untouched && this.formSubmitAttempt) ||
            (this.formulario.get(field).untouched && this.formulario.get(field).touched);
        }

        isFieldRequired(field: string) {
          if (this.formulario.get(field).errors == null) return false; //si no tiene errores
          return (this.formulario.get(field).errors.required && this.formulario.get(field).touched) || //si tiene error y lo toco
            (this.formulario.get(field).untouched && this.formSubmitAttempt) || //
            (this.formulario.get(field).untouched && this.formulario.get(field).touched);
        }

        isFieldMatchPass(pass: string, pass_confirmation: string) {
          if (this.formulario.get(pass_confirmation).errors == null) return false; //si no tiene errores
          return (!this.formulario.get(pass_confirmation).errors.required && this.formulario.get(pass_confirmation).touched && this.formulario.get(pass).value != this.formulario.get(pass_confirmation).value)
        }

        isFieldPattern(field: string) {
          if (this.formulario.get(field).errors == null) return false; //si no tiene errores
          return (!this.formulario.get(field).errors.required && this.formulario.get(field).touched && this.formulario.get(field).errors.pattern)//si tiene error y lo toco
        }
        isFieldEmail(field: string) {
          if (this.formulario.get(field).errors == null) return false; //si no tiene errores
          return (!this.formulario.get(field).errors.required && this.formulario.get(field).touched && this.formulario.get(field).errors.email)
        }




        reset() {
          this.formSubmitAttempt = false;
          this.error=false;
          this.success=false;

          this.router.navigate(['home']);


        /*  if (this.loginServices.isLogin()) {

            this.getForm(true)
            this.formPage = 1

          } else if (!this.loginServices.isLogin()){
            this.formPage = 0
          }*/

        }

          onSubmit() {

            this.formSubmitAttempt = true;
            if (this.formulario.valid) {
              this.send = true;
              this.error = false;


                this.loginServices.resetPassword(this.formulario.value).subscribe(
                  data => {
                    if (data['success'] === true) {
                      this.errorInfo=data['message']
                      this.send = false
                      this.error = false;
                      this.success = true;

                      setTimeout(() => {
                        this.reset();

                      }, 5000);
                    }
                  },
                  error => {

                    this.send = false;
                    this.error = true;
                    var serverError = error['data'];
                    this.errorInfo=error['message']
                    if (serverError['email']) {
                      this.errorInfo = serverError['email'];
                    }
                    if (serverError['password'] != null) {
                      this.errorInfo = serverError['password'];
                    }

                  });

            }
            else {
              this.errorInfo = "Compruebe que no haya errores y vuelva a intentarlo";
              this.error = true;
              validateAllFormFields(this.formulario);
            }

          }

}
