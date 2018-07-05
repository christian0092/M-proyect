import { Interests } from '../models/interests';
import { Actividad } from '../models/actividad';
export class Profile {
	constructor(
  public email:string,
  public name:string,
  public dni:string,
  public empleo:string,
  public estudios:string,
  public fechaDeNacimiento:string,
  public telefono:string,
  public pais:string,
  public provincia:string,
  public localidad:string,
  public codigoPostal:string,
  public calle:string,
  public piso:string,
  public tipo:string,
  public listaIntereses:Interests[],
  public agenda:Actividad[],
  public twitter:string,
  public facebook:string,
  public linkedin:string,  
  public instagram:string,
  ){
	}
}

