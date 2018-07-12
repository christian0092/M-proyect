import { Deserializable } from "./deserializable.model";

import { Interests } from '../models/interests';
import { Account } from '../models/account';
import { Person } from '../models/person';

export class Profile implements Deserializable{
				public id:string
        public name:string
        public email:string
        public enabled:string
        public linkedin_id:string
        public confirmed:string
        public confirmation_code:string
        public created_at:string
        public updated_at:string
				public person:Person
				public organization:string
				public interests: Interests[]
        public accounts: Account[]

	constructor(
  /*public email:string,
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
  public instagram:string,*/
  ){}

	deserialize(input: any) {
		Object.assign(this, input);
		this.accounts = input.accounts.map((account: Account) => new Account().deserialize(account));
		this.interests = input.interests.map((interests: Interests) => new Interests().deserialize(interests));
		this.person = new Person().deserialize(input.person);
		return this;
	}
}
