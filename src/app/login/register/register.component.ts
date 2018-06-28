import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  esInicio: boolean;

  esPersona: boolean;
  esEmpresa: boolean;
  private isValidPersona: boolean;

  constructor() { }

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
  }

  cerrar(){
    this.esInicio = true;
    this.esPersona = false;
    this.esEmpresa = false;
    this.isValidPersona = false;
  }

  botonClick(val){
    if(val==0){
      this.esPersona = true;
      this.esEmpresa = false;
      this.esInicio = false;
    }
    else{
      this.esPersona = false;
      this.esEmpresa = true;
      this.esInicio = false;
    }

  }
}
