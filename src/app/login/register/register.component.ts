import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Profile } from '../../models/profile';
import { UserService } from '../../services/user.service';
import { LoginService } from '../../services/login.service';
import { RegisterService } from '../../login/register/register.service';

import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public esInicio: boolean;
  public esPersona: boolean;
  public esEmpresa: boolean;
  public isValidPersona: boolean;
  public type: String;
  //private isLogged:boolean;
  isLogged: boolean;
  isLogged$: Observable<boolean>;

  close$: Observable<boolean>;
  profile$: Observable<Profile>

  @ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;

  constructor(
    private userService: UserService,
    private loginServices: LoginService,
    private registerService: RegisterService
  ) { }

  changePersona(valid) {
    if (valid)
      this.isValidPersona = true;
    else
      this.isValidPersona = false;
  }

  ngOnInit() {
    this.esInicio = true;
    this.esPersona = false;
    this.esEmpresa = false;
    this.isValidPersona = false;

    this.isLogged$ = this.loginServices.isLogin$();
    this.isLogged$.subscribe(
      isLoggin => {
        this.isLogged = isLoggin;
        if (isLoggin == true) {
          this.setProfile()
        }
      }
    )

    this.isLogged = this.loginServices.isLogin();
    if (this.loginServices.isLogin()) {
      if (this.userService.getProfile() == null || this.userService.getProfile() == undefined) {
        this.profile$ = this.userService.getMyProfile2()
        this.profile$.subscribe(myProfile => {
          this.userService.changeMyProfile(myProfile)
          this.checkType(this.isLogged)
        })
      }
      this.setProfile()
    }

    this.close$ = this.registerService.close();
    this.close$.subscribe(data => { if (!data) { this.cerrar() } });
  }

  setProfile() {

    /*  this.profile$=this.userService.getMyProfile2()
      this.profile$.subscribe(myProfile=>{

      if(myProfile.person!=null){
       // console.log("asigne persona")
        this.type="Persona"}
        else if(myProfile.organization!=null){
           //console.log("asigne empresa")
          this.type="Empresa"
        }}     )*/


    /*  if (this.userService.getProfile().person != null) {
        // console.log("asigne persona")
        this.type = "Persona"
      }
      else if (this.userService.getProfile().organization != null) {
        //console.log("asigne empresa")
        this.type = "Empresa"
     }
  */
    this.checkType(this.isLogged)



    //this.userService.checkMyProfile();

  }

  cerrar() {
    if (this.userService.isPerson() && this.isLogged) {
      this.action(0)
    }
    else if (!this.userService.isPerson() && this.isLogged) {
      this.action(1)
    } else if (!this.isLogged) {
      this.action(2)
    }
    this.registerService.pushGoBack();

  }

  checkType(log: boolean) {
    this.isLogged = log
    if (this.userService.isPerson() && this.isLogged) {
      this.action(0)
      //console.log("persona logeada");
    }
    else if (!this.userService.isPerson() && this.isLogged) {
      this.action(1)
     // console.log("empresa logeada");
    } else if (!this.isLogged) {
      this.action(2)
    //  console.log("forastero");
    }
  }

  action(val) {
    switch (val) {
      case 0:
        this.esPersona = true;
        this.esEmpresa = false;
        this.esInicio = false;
        break;
      case 1:
        this.esPersona = false;
        this.esEmpresa = true;
        this.esInicio = false;
        break;
      case 2:
        this.esPersona = false;
        this.esEmpresa = false;
        this.esInicio = true;
        break;

      default:
        // code...
        break;
    }
    this.isValidPersona = false;
  }
}
