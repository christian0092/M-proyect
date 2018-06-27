import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import { LoginService } from '../../../services/login.service';
import { Interests } from '../../../models/interests';
import { Socials } from '../../../models/socials';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-register-persona',
  templateUrl: './register-persona.component.html',
  styleUrls: ['./register-persona.component.css']
})
export class RegisterPersonaComponent implements OnInit {

    listaIntereses:Interests[]=[];
  listaSocial:Socials[]=[
  new Socials('1','Facebook','fa fa-facebook'),
  new Socials('2','Twitter','fa fa-twitter'),
  new Socials('3','Instagram','fa fa-instagram'),
  new Socials('4','Youtube','fa fa-youtube'),
  new Socials('5','Linkedin','fa fa-linkedin')
  ]


  formulario_persona: FormGroup;
  private formSubmitAttempt: boolean;

   formPage;

   esPersonaUsuario: boolean;
   esPersonaPersonales: boolean;
   esPersonaRedes: boolean;
   esPersonaCondiciones: boolean;

   esAnterior: boolean;
   esSiguiente: boolean;
   esFinalizar: boolean;
   esCancelar: boolean;


   send: boolean;
   error:boolean;

  constructor(
    private fp: FormBuilder,
    private service: LoginService,
    private registerServices: RegisterService,
  ) {
    //this.loadInterests();
    this.createFormPersona();
  }

  createFormPersona() {

    let allInterests: FormArray = new FormArray([]);

    this.registerServices.getInterests()
    .subscribe(
      data => {
        if(data['status']){
          this.listaIntereses=data['data'];

          for (let i = 0; i < this.listaIntereses.length; i++) {
            let fg = new FormGroup({});
            fg.addControl(this.listaIntereses[i].name, new FormControl(false));
            allInterests.push(fg);
          }

        } else{
          console.log("error");
        }
      }
    );

    let allSocials: FormArray = new FormArray([]);
    for (let i = 0; i < this.listaSocial.length; i++) {
      let fg = new FormGroup({});
      fg.addControl(this.listaSocial[i].name, new FormControl());
      allSocials.push(fg);
    }


    this.formulario_persona = this.fp.group({
      user : this.fp.group({
        email: [null, Validators.compose([Validators.required, Validators.email])],
        password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
        password_confirmation: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
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
        interests: allInterests,
        socials: allSocials
      })
    }, {validators: passwordMatchValidator});
  }

  /*loadInterests(){
      this.registerServices.getInterests()
      .subscribe(
      data => {
        if(data['status']){
          this.listaIntereses=data['data'];
          console.log(this.listaIntereses);


        } else{
          console.log("error");
        }
      }
    );
  }*/

  ngOnInit() {
    //this.loadInterests();


    this.formSubmitAttempt = false;

    this.formPage=0;

    this.esAnterior=false;
    this.esSiguiente=true;
    this.esFinalizar=false;
    this.esCancelar=true;

    this.esPersonaUsuario=true;
    this.esPersonaPersonales=false;
    this.esPersonaRedes=false;
    this.esPersonaCondiciones=false;



    /*this.enviado=false;
    this.enviado=false;*/
  }

  searchPage(){
    switch(this.formPage){
      case 0:
        this.esPersonaUsuario=true;
        this.esPersonaPersonales=false;
        this.esPersonaRedes=false;
        this.esPersonaCondiciones=false;
        this.esAnterior=false;
        this.esSiguiente=true;
        this.esFinalizar=false;
        break;
      case 1:

          this.esPersonaUsuario=false;
          this.esPersonaPersonales=true;
          this.esPersonaRedes=false;
          this.esPersonaCondiciones=false;
          this.esAnterior=true;
          this.esSiguiente=true;
          this.esFinalizar=false;
          break;

      case 2:
        this.esPersonaUsuario=false;
        this.esPersonaPersonales=false;
        this.esPersonaRedes=true;
        this.esPersonaCondiciones=false;
        this.esAnterior=true;
        this.esSiguiente=true;
        this.esFinalizar=false;
        break;
      case 3:
        this.esPersonaUsuario=false;
        this.esPersonaPersonales=false;
        this.esPersonaRedes=false;
        this.esPersonaCondiciones=true;
        this.esAnterior=true;
        this.esSiguiente=false;
        this.esFinalizar=true;
        break;
    }
  }
  onCancelar() {
    console.log("cierro");
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
        if (this.formulario_persona.get('user.email').valid  && this.formulario_persona.get('user.password').valid && this.formulario_persona.get('user.password_confirmation').valid ) {
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
      if (this.formulario_persona.get('person.name').valid  && this.formulario_persona.get('person.surname').valid && this.formulario_persona.get('person.birth_date').valid && this.formulario_persona.get('person.document_number').valid ) {
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
        this.formPage++;
        this.searchPage();
        break;
    }

  }


  onSubmit() {
    this.formSubmitAttempt = true;
    if (this.formulario_persona.valid) {
      this.send=true;
      this.error=false;
    /*this.service.register(this.formulario_persona.value).subscribe(
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
      );*/
    }
    else{

      this.error=true;
      this.validateAllFormFields(this.formulario_persona);
    }

  }

  isFieldValid(field: string) {

    return (!this.formulario_persona.get(field).valid && this.formulario_persona.get(field).touched) ||
      (this.formulario_persona.get(field).untouched && this.formSubmitAttempt);
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

    this.formulario_persona.reset();
    this.formSubmitAttempt = false;
  }
}

function passwordMatchValidator(g: FormGroup) {
  return g.get('password').value === g.get('passwordConfirm').value
     ? null : {'mismatch': true};
}
