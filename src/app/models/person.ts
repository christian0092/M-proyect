import { StudyLevel } from '../models/study_level';
import { Profession } from '../models/profession';
import { Country } from '../models/country';
import { Deserializable } from "./deserializable.model";

export class Person implements Deserializable{

            public id:string
            public name:string
            public surname:string
            public birth_date:string
            public document_type_id:string
            public study_level_id:string
            public profession_id:string
            public document_number:string
            public phone:string
            public email:string
            public country_id:string
            public province:string
            public city:string
            public postal_code:string
            public street:string
            public number:string
            public floor:string
            public dept:string
            public share_data:string
            public avatar:string
            public user_id:string
            public study_level:StudyLevel
            public profession:Profession
            public country:Country



	constructor(){}

	deserialize(input: any) {
		Object.assign(this, input);
		this.study_level = new StudyLevel().deserialize(input.study_level);
		this.profession = new Profession().deserialize(input.profession);
    this.country=new Country().deserialize(input.country);
		return this;
	}

}
