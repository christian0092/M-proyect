import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { passwordConfirming, passwordMatchValidator, validateAllFormFields, trueCheck } from '../../customValidators/customValidators';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

formulario: FormGroup;

send: boolean=false;
error: boolean=false;
success: boolean=false;
errorInfo: string="Error";
formSubmitAttempt: boolean;

  constructor(
    protected fp: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formulario = this.fp.group({
      user: this.fp.group({
        email: [null, Validators.compose([Validators.required, Validators.email])],
        password: [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(20)])],
        password_confirmation: [null, Validators.compose([Validators.required, passwordConfirming])],
      }),
      person: this.fp.group({
        name: [null, Validators.required],
        surname: [null, Validators.required],
        organization: [null],
        birth_date: [null],
        document_number: [null],
        profession_id: [null],
        study_level_id: [null],
        phone: [null],
        country_id: [null],
        province: [null],
        city: [null],
        street: [null],
        number: [null],
        postal_code: [null],
        floor: [null],
        dept: [null],
        terms: [true],
        share_data: [true],
        interests: this.fp.array([]),
        accounts: this.fp.array([]),
        avatar: [null],
        document_type_id: 1
      })
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

    isFieldBirthDate(field: string) {
      if (this.formulario.get(field).value == null) return false;
      var year = new Date();
      var value = new Date(this.formulario.get(field).value)
      return (this.formulario.get(field).touched && !(value.getFullYear() <= year.getFullYear() && value.getFullYear() >= (year.getFullYear() - 100)))
    }

    reset() {
      this.formSubmitAttempt = false;
      this.error=false
      this.success=false

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

          console.log(this.formulario.value);

            /*this.loginServices.register(this.formulario.value).subscribe(
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

              });*/

        }
        else {
          this.errorInfo = "Compruebe que no haya errores y vuelva a intentarlo";
          this.error = true;
          validateAllFormFields(this.formulario);
        }

      }
}
