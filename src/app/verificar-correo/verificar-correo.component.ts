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
public message;
  constructor(
    private route:ActivatedRoute,
    private correoService:VerificarCorreoService
  ) { }

  ngOnInit() {
    this.code=this.route.snapshot.paramMap.get('code');
    this.verificar();

  }

  verificar(){

     this.correoService.addVerificar(this.code).subscribe(
        data => {
          if(data['success']){
            this.message="Bienvenido, su registro ha sido verificado con éxito";
          }
          else{
            this.message="Error de verificación de registro";
          }

        }
      );

  }

}
