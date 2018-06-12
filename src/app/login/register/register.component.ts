import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private esPersona: boolean; 
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
    this.esPersona = true;
    this.isValidPersona = false;
  }

  botonClick(val){
    this.esPersona = val;
  }
}
