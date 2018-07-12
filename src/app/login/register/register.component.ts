import { Component, OnInit, Input , ViewChild, ElementRef} from '@angular/core';
import {Profile} from '../../models/profile';
import {UserService} from '../../services/user.service';
import { LoginService } from '../../services/login.service';
import {RegisterService} from '../../login/register/register.service'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private esInicio: boolean;
  private esPersona: boolean;
  private esEmpresa: boolean;
  private isValidPersona: boolean;
  private type:String;
  private isLogged:boolean;
  @ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;

  constructor( private userService:UserService, private loginServices: LoginService, private registerService:RegisterService) { }

  changePersona(valid){
    console.log(valid);
    if(valid)
      this.isValidPersona = true;
    else
      this.isValidPersona = false;
  }
  ngOnInit() {
    this.esInicio = true;
    this.esPersona = false;
    this.esEmpresa = false;
    this.isValidPersona = false;
    this.loginServices.isLogin$().subscribe(isLoggin=>this.checkType(isLoggin))
    this.loginServices.checkLogin();
    this.userService.getMyProfile2().subscribe(myProfile=>{ 
        
    if(myProfile.person!=null){
      console.log("asigne persona")
      this.type="Persona"}else if(myProfile.organization!=null){
         console.log("asigne persona")
        this.type="Empresa"
      }}     )
    
    this.userService.checkMyProfile();
    this.registerService.close().subscribe(data=>this.cerrar())
  }
  cerrar(){

    if(this.type=="Persona" && this.isLogged){
      this.action(0)
    }
      else if (this.type=="Empresa" && this.isLogged) {
      this.action(1)
      }else if (!this.isLogged) {
    this.action(2)
      }
    this.registerService.pushGoBack();

  }
  checkType(log:boolean){
    this.isLogged=log
    if(this.type=="Persona" && this.isLogged){
      this.action(0)
    console.log("persona logeada");
    }
      else if (this.type=="Empresa"&& this.isLogged) {
         this.action(1)
       console.log("empresa logeada");
      }else if (!this.isLogged) {
        this.action(2)
       console.log("forastero");
      }
  }

  action(val){
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
