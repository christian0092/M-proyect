import { Deserializable } from "./deserializable.model";

export class Room implements Deserializable {

    public id:number
    public name:string
    public description:string
    public capacity:string

    deserialize(input: any) {
      Object.assign(this, input);
      return this;
    }

}
