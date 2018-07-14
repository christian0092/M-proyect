import { Deserializable } from "./deserializable.model";

import { Interests } from '../models/interests';
import { Account } from '../models/account';
import { Person } from '../models/person';
import { Organization } from '../models/organization';

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
				//public organization:Organization
				public interests: Interests[]
        public accounts: Account[]

	constructor(
  ){}

	deserialize(input: any) {
		Object.assign(this, input);
		this.accounts = input.accounts.map((account: Account) => new Account().deserialize(account));
		this.interests = input.interests.map((interests: Interests) => new Interests().deserialize(interests));
		this.person = new Person().deserialize(input.person);
		//this.organization = new Organization().deserialize(input.organization);
		return this;
	}
}
