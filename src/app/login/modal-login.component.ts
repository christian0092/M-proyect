import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.css']
})
export class ModalLoginComponent implements OnInit {

  registroPersona:boolean;
  registroEmpresa:boolean;
  constructor() { }

  ngOnInit() {
  }
  activarRegistoPersona():void{
  	this.registroPersona=true;
  	this.registroEmpresa=false;

  }
   activarRegistoEmpresa():void{
  	this.registroPersona=false;
  	this.registroEmpresa=true;
  	console.log("algo hice");

  }

}
/*$("#toggle_persona").click(function(e){
  e.preventDefault();
  $("#registro_persona").slideToggle();
});
$(function() {
    $('#toggle_persona_evento').change(function() {
      $('#console-event').html('Toggle: ' + $(this).prop('checked')
    })
  })*/