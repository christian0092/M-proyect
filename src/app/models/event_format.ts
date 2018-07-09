import { Deserializable } from "./deserializable.model";

export class Event_format implements Deserializable {

    public id:string
    public name:string
    public description:string
    public duration:string

    deserialize(input: any) {
      Object.assign(this, input);
      return this;
    }
}
