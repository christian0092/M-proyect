import { Deserializable } from "./deserializable.model";

export class Participant implements Deserializable {
  public user_id: number
  public avatar: string
  public name: string
  public surname: string
  public status_id: number
  public status: string
 

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
