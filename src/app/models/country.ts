import { Deserializable } from "./deserializable.model";

export class Country implements Deserializable{

      public id:string
      public name:string
      public demonym:string

      deserialize(input: any) {
        Object.assign(this, input);
        return this;
      }

  }