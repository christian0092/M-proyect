import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import { LoginService } from '../../../services/login.service';
import { Socials } from '../../../models/socials';

@Component({
  selector: 'app-register-empresa',
  templateUrl: './register-empresa.component.html',
  styleUrls: ['./register-empresa.component.css']
})
export class RegisterEmpresaComponent implements OnInit {
  formulario_empresa: FormGroup;
  private formSubmitAttempt: boolean;

  listaSocial:Socials[]=[
  new Socials('1','Facebook','fa fa-facebook'),
  new Socials('2','Twitter','fa fa-twitter'),
  new Socials('3','Instagram','fa fa-instagram'),
  new Socials('4','Youtube','fa fa-youtube'),
  new Socials('5','Linkedin','fa fa-linkedin')
  ]

     formPage;

     esEmpresaUsuario: boolean;
     esEmpresaPersonales: boolean;
     esEmpresaRedes: boolean;
     esEmpresaCondiciones: boolean;

     esAnterior: boolean;
     esSiguiente: boolean;
     esFinalizar: boolean;
     esCancelar: boolean;

     send: boolean;
     error:boolean;

  constructor(
    private fe: FormBuilder,
    private loginServices: LoginService
  ) {
    this.createFormEmpresa();
  }

  ngOnInit() {
    this.formSubmitAttempt = false;

    this.formPage=0;

    this.esAnterior=false;
    this.esSiguiente=true;
    this.esFinalizar=false;
    this.esCancelar=true;

    this.esEmpresaUsuario=true;
    this.esEmpresaPersonales=false;
    this.esEmpresaRedes=false;
    this.esEmpresaCondiciones=false;
  }

  createFormEmpresa() {

    let allSocials: FormArray = new FormArray([]);
    for (let i = 0; i < this.listaSocial.length; i++) {
      let fg = new FormGroup({});
      fg.addControl(this.listaSocial[i].name, new FormControl());
      allSocials.push(fg);
    }

    this.formulario_empresa = this.fe.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      password_confirmation: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      name: [null, Validators.required],
      phone: [null, Validators.required],
      country_id: [null],
      province_id: [null],
      city_id: [null],
      street: [null],
      number: [null],
      postal_code: [null],
      floor: [null],
      dept: [null],
      contact_name: [null, Validators.required],
      contact_phone: [null, Validators.required],
      terms: [null, Validators.required],
      share_data: [true],
      socials: allSocials
    }, {validators: passwordMatchValidator});
  }


    searchPage(){

      switch(this.formPage){
        case 0:
          this.esEmpresaUsuario=true;
          this.esEmpresaPersonales=false;
          this.esEmpresaRedes=false;
          this.esEmpresaCondiciones=false;
          this.esAnterior=false;
          this.esSiguiente=true;
          this.esFinalizar=false;
          break;
        case 1:
            this.esEmpresaUsuario=false;
            this.esEmpresaPersonales=true;
            this.esEmpresaRedes=false;
            this.esEmpresaCondiciones=false;
            this.esAnterior=true;
            this.esSiguiente=true;
            this.esFinalizar=false;
            break;

        case 2:
          this.esEmpresaUsuario=false;
          this.esEmpresaPersonales=false;
          this.esEmpresaRedes=true;
          this.esEmpresaCondiciones=false;
          this.esAnterior=true;
          this.esSiguiente=true;
          this.esFinalizar=false;
          break;
        case 3:
          this.esEmpresaUsuario=false;
          this.esEmpresaPersonales=false;
          this.esEmpresaRedes=false;
          this.esEmpresaCondiciones=true;
          this.esAnterior=true;
          this.esSiguiente=false;
          this.esFinalizar=true;
          break;
      }
    }
    onCancelar() {
      this.reset();
    }
    onAnterior() {
      this.formPage--;
      this.searchPage();
      this.error=false;
    }
    onSiguiente() {

      switch(this.formPage){
        case 0:

          if (this.formulario_empresa.get('email').valid  && this.formulario_empresa.get('password').valid && this.formulario_empresa.get('password_confirmation').valid ) {

            this.formPage++;
            this.searchPage();
            this.error=false;
            break;
          }
          else{

            this.error=true;
            break;
          }
        case 1:
        if (this.formulario_empresa.get('name').valid  && this.formulario_empresa.get('phone').valid ) {
          this.formPage++;
          this.searchPage();
          this.error=false;
          break;
        }
        else{
          this.error=true;
          break;
        }
        case 2:
        if (this.formulario_empresa.get('contact_name').valid  && this.formulario_empresa.get('contact_phone').valid ) {
          this.formPage++;
          this.searchPage();
          this.error=false;
          break;
        }
        else{
          this.error=true;
          break;
        }
      }

    }


  onSubmit() {
    this.formSubmitAttempt = true;
    if (this.formulario_empresa.valid) {
      this.send=true;
      this.error=false;
        this.loginServices.register(this.formulario_empresa.value).subscribe(
        data => {
          if(data['success']){
            this.reset();
            this.send=true;
            this.error=false;
            //alert('Usuario creado correctamente');
          } else{
            alert(data['message']);
          }
        }
      );
    }
    else{

      this.error=true;
      this.validateAllFormFields(this.formulario_empresa);
    }
  }

  isFieldValid(field: string) {
    return (!this.formulario_empresa.get(field).valid && this.formulario_empresa.get(field).touched) ||
      (this.formulario_empresa.get(field).untouched && this.formSubmitAttempt);
  }
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
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
