import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { LoginService } from '../../../services/login.service';
import { Interests } from '../../../models/interests';
import { Socials } from '../../../models/socials';
import { RegisterService } from '../register.service';
import { RegisterComponent } from '../register.component';
import { StudyLevel } from '../../../models/study_level';
import { StudyLevelsService } from '../../../services/study-levels.service';
import { AccountsService } from '../../../services/accounts.service';
import {UserService} from '../../../services/user.service';


@Component({
  selector: 'app-register-persona',
  templateUrl: './register-persona.component.html',
  styleUrls: ['./register-persona.component.css']
})
export class RegisterPersonaComponent implements OnInit {
  items: any[] = [];


  listaIntereses: Interests[] = [];
  allInterests: FormArray = new FormArray([]);
  studyLevels: StudyLevel[];
  listaSocial: Socials[] = [
  /*  new Socials('1', 'Facebook', 'fa fa-facebook'),
    new Socials('2', 'Twitter', 'fa fa-twitter'),
    new Socials('3', 'Instagram', 'fa fa-instagram'),
    new Socials('4', 'Youtube', 'fa fa-youtube'),
    new Socials('5', 'Linkedin', 'fa fa-linkedin')*/
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
  error: boolean;
  isLogged:boolean;

  constructor(
    private fp: FormBuilder,
    private loginServices: LoginService,
    private registerServices: RegisterService,
    private studyLevelsService: StudyLevelsService,
    private accountService: AccountsService,
    private userService:UserService
  ) {
    this.createFormPersona();
  }

  createFormPersona() {
    this.loadInterests();
    this.loadAccounts();
    /*let allSocials: FormArray = new FormArray([]);
    for (let i = 0; i < this.listaSocial.length; i++) {
      let fg = new FormGroup({});
      fg.addControl(this.listaSocial[i].name, new FormControl());
      allSocials.push(fg);
    }*/

    this.formulario_persona = this.fp.group({
      user: this.fp.group({
        email: [null, Validators.compose([Validators.required, Validators.email])],
        password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
        password_confirmation: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      }),
      person: this.fp.group({
        name: [null, Validators.required],
        surname: [null, Validators.required],
        birth_date: [null, Validators.required],
        document_number: [null, Validators.required],
        empleo: [null],
        study_level_id: [null],
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
        //interests: this.allInterests,
        interests: this.fp.array([]),
        //socials: allSocials
        accounts: this.fp.array([])
      })
    }, { validators: passwordMatchValidator });
  }

  ngOnInit() {
    this.loadStudyLevels()
    this.formSubmitAttempt = false;
    this.formPage = 0;
    this.esAnterior = true;
    this.esSiguiente = true;
    this.esFinalizar = false;
    this.esCancelar = true;
    this.esPersonaUsuario = true;
    this.esPersonaPersonales = false;
    this.esPersonaRedes = false;
    this.esPersonaCondiciones = false;
    this.loginServices.isLogin$().subscribe(
      loginStatus=> this.getForm(loginStatus)

      )
    this.getForm(this.loginServices.isLogin());
   
  }
  ngAfterViewInit(){
    this.discardChanges();
  }
  discardChanges(){
  this.getForm(this.isLogged);
  }
  getForm(isLogged){
    this.isLogged=isLogged
    console.log(this.isLogged)
    if(this.isLogged){
      this.formulario_persona=this.userService.getForm(this.formulario_persona);
    }else{
      this.formulario_persona.reset();
    }
  }
  loadStudyLevels() {
    this.studyLevelsService.getStudyLevels().subscribe(
      levels => { this.studyLevels = levels.data },
      err => { console.log(err); }
    );
  }

  newIterestItem(id: string, name: string): FormGroup {
    return this.fp.group({
      checked: false,
      id: id,
      label: name
    });
  }

  addIterestItem(id: string, name: string): void {
    var item = this.formulario_persona.controls['person']['controls']['interests'] as FormArray;
    item.push(this.newIterestItem(id, name));    
  }

  loadInterests() {
    this.registerServices.getInterests().subscribe(
      data => {
        if (data['success']) {
          this.listaIntereses = data['data'];
          for (let i = 0; i < this.listaIntereses.length; i++) {
          /*  let fg = new FormGroup({});
            fg.addControl(this.listaIntereses[i].name, new FormControl(false));
            this.allInterests.push(fg);*/
            this.addIterestItem(this.listaIntereses[i].id, this.listaIntereses[i].name);
          }
          //console.log(this.formulario_persona.controls['person']);
          //console.log(this.formulario_persona.controls['person']['controls']['items']['controls']);
        } else {
          console.log("error");
        }
      }
    );
  }

  newAccountItem(id: string, name: string, imagen: string): FormGroup {
    return this.fp.group({
      image: imagen,
      id: id,
      label: name,
      value: null
    });
  }

  addAccountItem(id: string, name: string, imagen: string): void {
    var item = this.formulario_persona.controls['person']['controls']['accounts'] as FormArray;
    item.push(this.newAccountItem(id, name, imagen));  
    //console.log(imagen);  
  }

  loadAccounts() {
    this.accountService.getAccounts().subscribe(
      data => {
        if (data['success']) {
          this.listaSocial = data['data'];         
          for (let i = 0; i < this.listaSocial.length; i++) {
          /*  let fg = new FormGroup({});
            fg.addControl(this.listaIntereses[i].name, new FormControl(false));
            this.allInterests.push(fg);*/
            this.addAccountItem(this.listaSocial[i].id, this.listaSocial[i].name, this.listaSocial[i].image_name);
          }
          //console.log(this.formulario_persona.controls['person']);
          //console.log(this.formulario_persona.controls['person']['controls']['items']['controls']);
        } else {
          console.log("error");
        }
      }
    );
  }

  searchPage() {
    switch (this.formPage) {
      case 0:
        this.esPersonaUsuario = true;
        this.esPersonaPersonales = false;
        this.esPersonaRedes = false;
        this.esPersonaCondiciones = false;
        this.esAnterior = true;
        this.esSiguiente = true;
        this.esFinalizar = false;
        break;
      case 1:
        this.esPersonaUsuario = false;
        this.esPersonaPersonales = true;
        this.esPersonaRedes = false;
        this.esPersonaCondiciones = false;
        this.esAnterior = true;
        this.esSiguiente = true;
        this.esFinalizar = false;
        break;
      case 2:
        this.esPersonaUsuario = false;
        this.esPersonaPersonales = false;
        this.esPersonaRedes = true;
        this.esPersonaCondiciones = false;
        this.esAnterior = true;
        this.esSiguiente = true;
        this.esFinalizar = false;
        break;
      case 3:
        this.esPersonaUsuario = false;
        this.esPersonaPersonales = false;
        this.esPersonaRedes = false;
        this.esPersonaCondiciones = true;
        this.esAnterior = true;
        this.esSiguiente = false;
        this.esFinalizar = true;
        break;
    }
  }

  onCancelar() {
    console.log("cierro");
    this.reset();
  }

  onAnterior() {
    if(this.formPage>0){
    this.formPage--;
    this.searchPage();
    this.error = false;}
    else if(this.formPage==0){
      

    }
  }

  onSiguiente() {
    switch (this.formPage) {
      case 0:
        if (this.formulario_persona.get('user.email').valid && this.formulario_persona.get('user.password').valid && this.formulario_persona.get('user.password_confirmation').valid) {
          this.formPage++;
          this.searchPage();
          this.error = false;
          break;
        }
        else {
          this.error = true;
          break;
        }
      case 1:
        if (this.formulario_persona.get('person.name').valid && this.formulario_persona.get('person.surname').valid && this.formulario_persona.get('person.birth_date').valid && this.formulario_persona.get('person.document_number').valid) {
          this.formPage++;
          this.searchPage();
          this.error = false;
          break;
        }
        else {
          this.error = true;
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
      this.send = true;
      this.error = false;
      this.loginServices.register(this.formulario_persona.value).subscribe(
        data => {
          if (data['success']) {
            this.reset();
            this.send = true;
            this.error = false;
            //alert('Usuario creado correctamente');
          } else {
            alert(data['message']);
          }
        }
      );
    }
    else {
      this.error = true;
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
    ? null : { 'mismatch': true };
}
