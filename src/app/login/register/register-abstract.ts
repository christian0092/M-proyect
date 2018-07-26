import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, NG_ASYNC_VALIDATORS, AbstractControl } from '@angular/forms';
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
import { UserService } from '../../services/user.service';
import { passwordConfirming, passwordMatchValidator, validateAllFormFields } from '../../customValidators/customValidators';
import { onSubmitAbstract, resetAbstract } from '../register/registerDecorator';
import { Observable } from 'rxjs/Observable'
import { getLocaleDateFormat } from '@angular/common';
import { Profile } from '../../models/profile'

export class RegisterAbstract implements OnInit {
  items: any[] = [];

  countries: Countries[]
  listaIntereses: Interests[] = [];
  allInterests: FormArray = new FormArray([]);
  studyLevels: StudyLevel[];
  professionLevels: ProfessionLevel[]
  listaSocial: Socials[] = []

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
  send: boolean=false;
  error: boolean=false;
  success: boolean=false;
  errorInfo: string;
  isLogged: boolean;
  profile: Profile;

  loginObservable$: Observable<boolean>
  profileObservable$: Observable<Profile>
  registerObservable$: Observable<boolean>

  maxDate: Date = new Date();
  minDate: Date = new Date();

  mobnumPattern = "^((\\+?[0-9]{2,3}-?))?[0-9]{3,5}[-]{0,1}[0-9]{3,8}$";
  datePattern = "^[0-9]{4}-[0-9]{2}-[0-9]{2}$";

  constructor(
    protected fp: FormBuilder,
    private loginServices: LoginService,
    private registerServices: RegisterService,
    private studyLevelsService: StudyLevelsService,
    private accountService: AccountsService,
    private userService: UserService,
    private professionLevelsService: ProfessionLevelsService,
    private countriesService: CountriesService
  ) {
    this.createFormRegistro();
  }

  createFormRegistro() {
    this.loadInterests();
    this.loadAccounts();
    this.createForm();

  }

  createForm() { }

  ngOnInit() {
    this.minDate.setFullYear(this.minDate.getFullYear() - 100);
    this.loadStudyLevels()
    this.loadProfessionLevels()
    this.loadCountries()
    this.formSubmitAttempt = false;
    this.formPage = 0;
    this.esAnterior = false;
    this.esSiguiente = true;
    this.esFinalizar = false;
    this.esCancelar = true;
    this.esRegistroUsuario = true;
    this.esRegistroPersonales = false;
    this.esRegistroRedes = false;
    this.esRegistroCondiciones = false;
    this.loginObservable$ = this.loginServices.isLogin$()
    this.loginObservable$.subscribe(
      loginStatus => {
        this.isLogged=loginStatus
       // this.getForm(loginStatus)
        if (!loginStatus) { this.reset() }
      })
    this.registerObservable$ = this.registerServices.goBack()
    this.registerObservable$.subscribe(
      data => this.discardChanges())
    //this.getForm(this.loginServices.isLogin())
    this.registerServices.close().subscribe(
      data => { if (data) { this.reset() } })
      this.formulario.reset();

  }
 ngAfterViewInit(){ this.registerServices.pushGoBack()}
  discardChanges() {
    this.getForm(this.isLogged);
    this.formPage = 0;
    this.searchPage();
    this.error = false;
    this.send = false;
  }

  ngAfterviewInit() {
  }

  checkSomeInterest(): boolean {
    var name = 'person'
    if (this.formulario.controls['organization'])
      name = 'organization'
    for (let interest of this.formulario.controls[name]['controls']['interests']['controls']) {
      if (interest.value.checked === true)
        return true;
    };
    return false;
  }

  getForm(isLogged) {
    this.isLogged = isLogged

    if (this.isLogged && this.countries && this.listaIntereses && this.studyLevels && this.professionLevels && this.listaSocial) {
      this.formPage = 1
      this.searchPage()
      if (this.userService.getProfile() == null || this.userService.getProfile() == undefined) {
        this.profileObservable$ = this.userService.getMyProfile2()
        this.profileObservable$.subscribe(myProfile => {

          this.profile = myProfile
         // this.userService.getForm(this.formulario, this.profile);
          //console.log('cargo desde el observer')
        })
      }
      this.profile = this.userService.getProfile()
      if (this.profile != undefined) {
        this.userService.getForm(this.formulario, this.profile);
       //this.reset()
      }
    }
    this.searchPage()
  }

  loadStudyLevels() {
    this.studyLevelsService.getStudyLevels().subscribe(
      levels => { this.studyLevels = levels.data
      this.getForm(this.isLogged) },
      err => { console.log(err); }
    );
  }

  loadProfessionLevels() {
    this.professionLevelsService.getProfessionLevels().subscribe(
      levels => { this.professionLevels = levels.data
      this.getForm(this.isLogged) },
      err => { console.log(err); }
    );
  }

  loadCountries() {
    this.countriesService.getCountries().subscribe(
      levels => { this.countries = levels.data
      this.getForm(this.isLogged) },
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
    var namefield = 'person'
    if (this.formulario.controls['organization'])
      namefield = 'organization'
    var item = this.formulario.controls[namefield]['controls']['interests'] as FormArray;
    item.push(this.newIterestItem(id, name));
  }

  loadInterests() {
    this.registerServices.getInterests().subscribe(
      data => {
        if (data['success']) {
          this.listaIntereses = data['data'];
          for (let i = 0; i < this.listaIntereses.length; i++) {
            this.addIterestItem(this.listaIntereses[i].id, this.listaIntereses[i].name);
          }
          this.getForm(this.isLogged);
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
            this.addAccountItem(this.listaSocial[i].id, this.listaSocial[i].name, this.listaSocial[i].image_name);
          }
          this.getForm(this.isLogged);
        }
      }
    );
  }

  addAccountItem(id: string, name: string, imagen: string): void {
    var namefield = 'person'
    if (this.formulario.controls['organization'])
      namefield = 'organization'
    var item = this.formulario.controls[namefield]['controls']['accounts'] as FormArray;
    item.push(this.newAccountItem(id, name, imagen));
  }

  searchPage() {
    switch (this.formPage) {
      case 0:
        this.esRegistroUsuario = true;
        this.esRegistroPersonales = false;
        this.esRegistroRedes = false;
        this.esRegistroCondiciones = false;
        this.esAnterior = false;
        this.esSiguiente = true;
        this.esFinalizar = false;
        break;
      case 1:
        this.esRegistroUsuario = false;
        this.esRegistroPersonales = true;
        this.esRegistroRedes = false;
        this.esRegistroCondiciones = false;
        this.esSiguiente = true;
        this.esFinalizar = false;
        if (!this.loginServices.isLogin()) {
          this.esAnterior = true;
        } else { this.esAnterior = false }
        break;
      case 2:
        this.esRegistroUsuario = false;
        this.esRegistroPersonales = false;
        this.esRegistroRedes = true;
        this.esRegistroCondiciones = false;
        this.esAnterior = true;
        if (!this.loginServices.isLogin()) {
          this.esSiguiente = true;
          this.esFinalizar = false;
        } else {
        this.esSiguiente = false;
          this.esFinalizar = true;
        }
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
    this.reset();
  }

  onAnterior() {
    if (this.formPage > 0) {
      //console.log('formpage:' + this.formPage)
      if ((this.loginServices.isLogin() && this.formPage > 1) || !this.loginServices.isLogin()) {
        this.formPage--;
        this.searchPage();
        this.error = false;
      }
      else if (this.loginServices.isLogin() && this.formPage <= 1) {
        this.searchPage();
        this.error = false;
      }
    }
  }

  onSubmit() {
    this.formSubmitAttempt = true;
    if (this.formulario.valid) {
      this.send = true;
      this.error = false;
      if (!this.isLogged) {//registra si no esta logueado
        this.loginServices.register(this.formulario.value).subscribe(
          data => {
            if (data['success'] === true) {
             // console.log(data)
              this.errorInfo=data['message']
              //console.log(this.errorInfo)
              this.send = false
              this.error = false;
              this.success = true;

              setTimeout(() => {
                this.reset();
                this.registerServices.pushClose()
              }, 5000);
            }
          },
          error => {
           // console.log(error)
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
            if (serverError['document_number'] != null) {
              this.errorInfo = serverError['document_number'];
            }
          });
      } else if (this.isLogged) {
        this.loginServices.edit(this.formulario.value).subscribe(
          data => {
            if (data['success'] === true) {
              this.errorInfo=data['message']
              this.send = false
              this.error = false;
              this.success = true;
              this.refreshProfile();
              setTimeout(() => {
                this.reset();
                this.registerServices.pushClose()
              }, 5000);
            }
          },
          error => {
           // console.log(error)
            this.send = false;
            this.error = true;
            //console.log(error)
            this.errorInfo = error['message'];

          });

      }
    }
    else {
      this.errorInfo = "Compruebe que no haya errores y vuelva a intentarlo";
      this.error = true;
      validateAllFormFields(this.formulario);
    }
    //let obj={loginServices:this.loginServices,formSubmitAttempt:this.formSubmitAttempt,send:this.send,error:this.error,isLogged:this.isLogged}=onSubmitAbstract(this.formulario,this.loginServices, this.formSubmitAttempt,this.send,this.error,this.isLogged);
  }

  refreshProfile(){
    this.userService.getMyProfile2().subscribe(
      profile => this.userService.changeMyProfile(profile)
    )
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
    this.searchPage()
    if (this.loginServices.isLogin()) {

      this.getForm(true)
      this.formPage = 1
       //console.log(this.formPage)
    } else if (!this.loginServices.isLogin()){
      //console.log(this.loginServices.isLogin())
      this.formPage = 0
      //this.formulario.reset();
    }

  }
}
