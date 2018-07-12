import { Deserializable } from "./deserializable.model";

export class StudyLevel implements Deserializable{

      public id:string
      public name:string

      deserialize(input: any) {
        Object.assign(this, input);
        return this;
      }

  }
