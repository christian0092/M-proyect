import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-register-persona',
  templateUrl: './register-persona.component.html',
  styleUrls: ['./register-persona.component.css']
})
export class RegisterPersonaComponent implements OnInit {
  formulario_persona: FormGroup;
  private formSubmitAttempt: boolean;

  constructor(
    private fp: FormBuilder,
    private service: LoginService
  ) { 
    this.createFormPersona();
  }

  createFormPersona() {
    this.formulario_persona = this.fp.group({
      user : this.fp.group({
        email: [null, Validators.compose([Validators.required, Validators.email])],
       // pwd: this.fp.group({
          password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
          password_confirmation: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
       // }),        
      }),
      person : this.fp.group({
        name: [null, Validators.required],
        surname: [null, Validators.required],
        birth_date: [null, Validators.required],
        document_number: [null, Validators.required],
        empleo: [null],
        study_level_id: [null],
        intereses: [null],
        cellphone: [null],
        country_id: [null],
        province_id: [null],
        city_id: [null],
        street: [null],
        number: [null],
        postal_code: [null],
        floor: [null],
        dept: [null],
        terms: [null, Validators.required],
        share_data: [true, Validators.required],
      })
    }, {validators: passwordMatchValidator});
  }

  ngOnInit() {
    this.formSubmitAttempt = false;
  }

  onSubmit() {
    this.formSubmitAttempt = true;
    if (this.formulario_persona.valid) {    
      this.service.register(this.formulario_persona.value).subscribe(
        data => {
          if(data['success']){
            this.reset();            
            alert('Usuario creado correctamente');
          } else{
            alert(data['message']);
          }
        }
      );
    } else
      this.validateAllFormFields(this.formulario_persona);
  }

  isFieldValid(field: string) {
    return (!this.formulario_persona.get(field).valid && this.formulario_persona.get(field).touched) ||
      (this.formulario_persona.get(field).untouched && this.formSubmitAttempt);
  }

  validateAllFormFields(formGroup: FormGroup) {         //{1}
    Object.keys(formGroup.controls).forEach(field => {  //{2}
      const control = formGroup.get(field);             //{3}
      if (control instanceof FormControl) {             //{4}
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {        //{5}
        this.validateAllFormFields(control);            //{6}
      }
    });
  }

  reset() {
    this.formulario_persona.reset();
    this.formSubmitAttempt = false;
  }
}

function passwordMatchValidator(g: FormGroup) {
  return g.get('password').value === g.get('passwordConfirm').value
     ? null : {'mismatch': true};
}
