import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VerificarCorreoService } from './verificar-correo.service';

@Component({
  selector: 'app-verificar-correo',
  templateUrl: './verificar-correo.component.html',
  styleUrls: ['./verificar-correo.component.css']
})
export class VerificarCorreoComponent implements OnInit {

public code;
public message="";
public message2="";
  constructor(
    private route:ActivatedRoute,
    private correoService:VerificarCorreoService
  ) { }

  ngOnInit() {
    this.code=this.route.snapshot.paramMap.get('code');
    this.verificar();

  }

  verificar(){
    //this.message="Bienvenido, su registro ha sido verificado con éxito";
     this.correoService.addVerificar(this.code).subscribe(
        data => {
          if(data['success']){
            this.message="Tu registro ha sido verificado con éxito";
            this.message2="Ya puedes empezar a disfrutar de los eventos";
          }
          else{
            this.message="Ha ocurrido un error con al verificacion del registro, por favor, comuniquese con nosotros.";
            this.message2="";
          }

        }
      );

  }

}
