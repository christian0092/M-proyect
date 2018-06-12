import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-register-empresa',
  templateUrl: './register-empresa.component.html',
  styleUrls: ['./register-empresa.component.css']
})
export class RegisterEmpresaComponent implements OnInit {
  formulario_empresa: FormGroup;
  private formSubmitAttempt: boolean;

  constructor(
    private fe: FormBuilder,
    private service: LoginService
  ) { 
    this.createFormEmpresa(); 
  }

  ngOnInit() {
    this.formSubmitAttempt = false;
  }

  createFormEmpresa() {
    this.formulario_empresa = this.fe.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      password_confirmation: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      name: [null, Validators.required],      
      phone: [null, Validators.required],
      country_id: [null, Validators.required],
      province_id: [null, Validators.required],
      city_id: [null, Validators.required],
      street: [null, Validators.required],
      number: [null, Validators.required],
      postal_code: [null],
      floor: [null],
      dept: [null],
      contact_name: [null, Validators.required],
      contact_phone: [null, Validators.required],
      terms: [null, Validators.required],
      share_data: [true]
    }, {validators: passwordMatchValidator});
  }

  onSubmit() {
    this.formSubmitAttempt = true;
    if (this.formulario_empresa.valid) {    
      this.service.register(this.formulario_empresa.value).subscribe(
        data => {
          if(data['status']){
            this.reset();            
            alert('Usuario creado correctamente');
          }        
        }
      );
    }
  }

  isFieldValid(field: string) {
    return (!this.formulario_empresa.get(field).valid && this.formulario_empresa.get(field).touched) ||
      (this.formulario_empresa.get(field).untouched && this.formSubmitAttempt);
  }

  reset() {
    this.formulario_empresa.reset();
    this.formSubmitAttempt = false;
  }
}

function passwordMatchValidator(g: FormGroup) {
  return g.get('password').value === g.get('password_confirmation').value
     ? null : {'mismatch': true};
}