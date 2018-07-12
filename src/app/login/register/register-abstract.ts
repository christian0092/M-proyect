import { Component, OnInit, Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, NG_ASYNC_VALIDATORS , AbstractControl} from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Interests } from '../../models/interests';
import { Socials } from '../../models/socials';
import { RegisterService } from '../register/register.service';
import { RegisterComponent } from '../register/register.component';
import { StudyLevel } from '../../models/study_level';
import { ProfessionLevel } from '../../models/profession-level';
import { Countries } from '../../models/countries';
import { StudyLevelsService } from '../../services/study-levels.service';
import { ProfessionLevelsService } from '../../services/profession-levels.service';
import { CountriesService } from '../../services/countries.service';
import { AccountsService } from '../../services/accounts.service';
import {UserService} from '../../services/user.service';
import { passwordConfirming, passwordMatchValidator, validateAllFormFields} from '../../customValidators/customValidators';
import { onSubmitAbstract, resetAbstract } from '../register/registerDecorator';
 import { Observable } from 'rxjs/Observable'

export class RegisterAbstract implements OnInit {
  items: any[] = [];

  countries:Countries[]
  listaIntereses: Interests[] = [];
  allInterests: FormArray = new FormArray([]);
  studyLevels: StudyLevel[];
  professionLevels: ProfessionLevel[]
  listaSocial: Socials[] = [
  /*  new Socials('1', 'Facebook', 'fa fa-facebook'),
    new Socials('2', 'Twitter', 'fa fa-twitter'),
    new Socials('3', 'Instagram', 'fa fa-instagram'),
    new Socials('4', 'Youtube', 'fa fa-youtube'),
    new Socials('5', 'Linkedin', 'fa fa-linkedin')*/
  ]

  formulario: FormGroup;
   formSubmitAttempt: boolean;
  formPage;
  esRegistroUsuario: boolean;
  esRegistroPersonales: boolean;
  esRegistroRedes: boolean;
  esRegistroCondiciones: boolean;

  esAnterior: boolean;
  esSiguiente: boolean;
  esFinalizar: boolean;
  esCancelar: boolean;
  send: boolean;
  error: boolean;
  success:boolean;
  errorInfo:string;
  isLogged:boolean;

  constructor(
    protected fp: FormBuilder,
    private loginServices: LoginService,
    private registerServices: RegisterService,
    private studyLevelsService: StudyLevelsService,
    private accountService: AccountsService,
    private userService:UserService,
    private professionLevelsService: ProfessionLevelsService,
    private countriesService: CountriesService
  ) {
    this.createFormRegistro();
  }

  createFormRegistro() {
    this.loadInterests();
    this.loadAccounts();
    this.createForm();
    /*let allSocials: FormArray = new FormArray([]);
    for (let i = 0; i < this.listaSocial.length; i++) {
      let fg = new FormGroup({});
      fg.addControl(this.listaSocial[i].name, new FormControl());
      allSocials.push(fg);
    }*/

    
  }
  createForm(){
   
  }

  ngOnInit() {
    this.loadStudyLevels()
    this.loadProfessionLevels()
    this.loadCountries()
    this.formSubmitAttempt = false;
    this.formPage = 0;
    this.esAnterior = true;
    this.esSiguiente = true;
    this.esFinalizar = false;
    this.esCancelar = true;
    this.esRegistroUsuario = true;
    this.esRegistroPersonales = false;
    this.esRegistroRedes = false;
    this.esRegistroCondiciones = false;
    this.loginServices.isLogin$().subscribe(
      loginStatus=> this.getForm(loginStatus)

      )
    this.loginServices.isLogin();
    this.registerServices.goBack().subscribe(
      data=>this.discardChanges())        
  }

  discardChanges(){
  this.getForm(this.isLogged);
  this.formPage=0;
  this.searchPage();
  this.error=false;
  this.send=false;
  }
  ngAfterviewInit(){
  }

  getForm(isLogged){
    this.isLogged=isLogged
    console.log(this.isLogged)
    if(this.isLogged){
      this.formulario=this.userService.getForm(this.formulario);
    }else{
      this.formulario.reset();
    }
  }
  loadStudyLevels() {
    this.studyLevelsService.getStudyLevels().subscribe(
      levels => { this.studyLevels = levels.data },
      err => { console.log(err); }
    );
  }

  loadProfessionLevels(){
    this.professionLevelsService.getProfessionLevels().subscribe(
      levels => { this.professionLevels = levels.data },
      err => { console.log(err); }
    );
  }
  loadCountries(){
    this.countriesService.getCountries().subscribe(
      levels => { this.countries = levels.data },
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
    var item = this.formulario.controls['person']['controls']['interests'] as FormArray;
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
          //console.log(this.formulario.controls['person']);
          //console.log(this.formulario.controls['person']['controls']['items']['controls']);
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
          //console.log(this.formulario.controls['person']);
          //console.log(this.formulario.controls['person']['controls']['items']['controls']);
        } else {
          console.log("error");
        }
      }
    );
  }
  addAccountItem(id: string, name: string, imagen: string): void {
    var item = this.formulario.controls['person']['controls']['accounts'] as FormArray;
    item.push(this.newAccountItem(id, name, imagen));  
    //console.log(imagen);  
  }

  searchPage() {
    switch (this.formPage) {
      case 0:
        this.esRegistroUsuario = true;
        this.esRegistroPersonales = false;
        this.esRegistroRedes = false;
        this.esRegistroCondiciones = false;
        this.esAnterior = true;
        this.esSiguiente = true;
        this.esFinalizar = false;
        break;
      case 1:
        this.esRegistroUsuario = false;
        this.esRegistroPersonales = true;
        this.esRegistroRedes = false;
        this.esRegistroCondiciones = false;
        this.esAnterior = true;
        this.esSiguiente = true;
        this.esFinalizar = false;
        break;
      case 2:
        this.esRegistroUsuario = false;
        this.esRegistroPersonales = false;
        this.esRegistroRedes = true;
        this.esRegistroCondiciones = false;
        this.esAnterior = true;
        this.esSiguiente = true;
        this.esFinalizar = false;
        break;
      case 3:
        this.esRegistroUsuario = false;
        this.esRegistroPersonales = false;
        this.esRegistroRedes = false;
        this.esRegistroCondiciones = true;
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

  

  onSubmit() {
    this.formSubmitAttempt = true;
    if (this.formulario.valid) {
      this.send = true;
      this.error = false;
      if(!this.isLogged){//registra si no esta logueado
      this.loginServices.register(this.formulario.value).subscribe(
        data => {
          console.log(data)
          if (data['success']) {
            this.send =false
            this.error = false;
            this.success=true;
           
            setTimeout(() => {
              this.reset();
              this.registerServices.pushClose()
             
            }, 5000);
                    
            
       

            /*console.error(data['message'])
            this.send = false;
            this.error=true
            this.errorInfo=data['message'];*/
          } else {
            console.log(data['success'])
            this.send = false;
            this.error=true
            this.errorInfo=data['message'];
            }
          },error=>{
            this.send = false;
            this.error=true
           this.errorInfo=error;
           console.log(error);
          });
      }else if(this.isLogged){
        console.log("modificando usuario");
      }
    }
    else {
      this.errorInfo="Compruebe que no haya errores y vuelva a intentarlo";
      this.error = true;
      validateAllFormFields(this.formulario);
    }
   //let obj={loginServices:this.loginServices,formSubmitAttempt:this.formSubmitAttempt,send:this.send,error:this.error,isLogged:this.isLogged}=onSubmitAbstract(this.formulario,this.loginServices, this.formSubmitAttempt,this.send,this.error,this.isLogged);
  }

  isFieldValid(field: string) {
   return (!this.formulario.get(field).valid && this.formulario.get(field).touched) ||
      (this.formulario.get(field).untouched && this.formSubmitAttempt) ||
      (this.formulario.get(field).untouched && this.formulario.get(field).touched);

  }

  

  reset() {
    this.formulario.reset();
    this.formSubmitAttempt = false;
    //let obj={form:this.formulario,formSubmitAttempt:this.formSubmitAttempt}=resetAbstract(this.formulario,this.isFieldValid)
  }
}







