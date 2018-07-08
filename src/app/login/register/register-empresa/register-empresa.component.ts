import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import { LoginService } from '../../../services/login.service';
import { Socials } from '../../../models/socials';
import { passwordConfirming, passwordMatchValidator,validateAllFormFields} from '../../../customValidators/customValidators';
import { isFieldValidation, onSubmitAbstract, resetAbstract } from '../registerDecorator';
import {UserService} from '../../../services/user.service';
import { RegisterService } from '../register.service';
import { RegisterAbstract } from '../register-abstract';
import { StudyLevelsService } from '../../../services/study-levels.service';
import { AccountsService } from '../../../services/accounts.service';
@Component({
  selector: 'app-register-empresa',
  templateUrl: './register-empresa.component.html',
  styleUrls: ['./register-empresa.component.css']
})
export class RegisterEmpresaComponent  extends RegisterAbstract implements OnInit {
/*
  
  formulario_empresa: FormGroup;
  private formSubmitAttempt: boolean;*/

  /*listaSocial:Socials[]=[
  new Socials('1','Facebook','fa fa-facebook',''),
  new Socials('2','Twitter','fa fa-twitter',''),
  new Socials('3','Instagram','fa fa-instagram',''),
  new Socials('4','Youtube','fa fa-youtube',''),
  new Socials('4','Linkedin','fa fa-linkedin',''),
  ]/*

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
     isLogged:boolean;

  */constructor( fp: FormBuilder,
    loginServices: LoginService,
     registerServices: RegisterService,
     studyLevelsService: StudyLevelsService,
    accountService: AccountsService,
    userService:UserService
   ) {
    super( fp, loginServices,registerServices, studyLevelsService,
    accountService,
    userService)

      }

      createForm(){
      this.formulario = this.fp.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      password_confirmation: [null, Validators.compose([Validators.required, passwordConfirming])],
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
      //socials: allSocials
      interests: this.fp.array([]),
        //socials: allSocials,
      accounts: this.fp.array([])
    }, {validators: passwordMatchValidator});
  }
     addIterestItem(id: string, name: string): void {
    var item = this.formulario.controls['interests'] as FormArray;
    item.push(this.newIterestItem(id, name));    
  }
addAccountItem(id: string, name: string, imagen: string): void {
    var item = this.formulario.controls['accounts'] as FormArray;
    item.push(this.newAccountItem(id, name, imagen));  
    //console.log(imagen);  
  }
  onSiguiente() {

      switch(this.formPage){
        case 0:

          if (this.formulario.get('email').valid  && this.formulario.get('password').valid && this.formulario.get('password_confirmation').valid ) {

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
        if (this.formulario.get('name').valid  && this.formulario.get('phone').valid ) {
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
        if (this.formulario.get('contact_name').valid  && this.formulario.get('contact_phone').valid ) {
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
      }





  /*ngOnInit() {
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
    this.loginServices.isLogin$().subscribe(
      loginStatus=> this.getForm(loginStatus)

      )
    //this.loginServices.isLogin();
    this.registerServices.goBack().subscribe(
      data=>this.discardChanges())      
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
      password_confirmation: [null, Validators.compose([Validators.required, passwordConfirming])],
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
getForm(isLogged){
    this.isLogged=isLogged
    console.log(this.isLogged)
    if(this.isLogged){
      this.formulario_empresa=this.userService.getForm(this.formulario_empresa);
    }else{
      this.formulario_empresa.reset();
    }
  }
 discardChanges(){
  this.getForm(this.isLogged);
  this.formPage=0;
  this.searchPage();
  this.error=false;
  this.send=false;
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
    


  onSubmit() {
    this.formSubmitAttempt = true;
    /*if (this.formulario_empresa.valid) {
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
      validateAllFormFields(this.formulario_empresa);
    }*/
   /* let obj={loginServices:this.loginServices,formSubmitAttempt:this.formSubmitAttempt,send:this.send,error:this.error,isLogged:this.isLogged}=onSubmitAbstract(this.formulario_empresa,this.loginServices, this.formSubmitAttempt,this.send,this.error,this.isLogged);
  
  }

  isFieldValid(field: string) {
    return isFieldValidation(field, this.formulario_empresa)
  }
  reset() {
    /*this.formulario_empresa.reset();
    this.formSubmitAttempt = false;*/
     /*let obj={form:this.formulario_empresa,formSubmitAttempt:this.formSubmitAttempt}=resetAbstract(this.formulario_empresa,this.isFieldValid)
  
  }*/


