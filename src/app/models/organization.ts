
import { Country } from '../models/country';
import { Deserializable } from "./deserializable.model";

export class Organization implements Deserializable{

            public id:string
            public name:string
            public phone:string
            public email:string
            public city:string
            public province:string
            public country_id:string
            public postal_code:string
            public street:string
            public number:string
            public floor:string
            public dept:string
            public contact_name:string
            public contact_phone:string
            public avatar:string
            public share_data:string
            public user_id:string
            public country:Country



	constructor(){}

	deserialize(input: any) {
		Object.assign(this, input);
    this.country=new Country().deserialize(input.country)
		return this;
	}

}
