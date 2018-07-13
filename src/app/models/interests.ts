import { Deserializable } from "./deserializable.model";

export class Interests implements Deserializable{
  public id:string
  public name:string

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }

}
