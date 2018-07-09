import { Deserializable } from "./deserializable.model";

export class Account implements Deserializable {
  public id: string
  public name: string
  public image_name: string
  public enabled: string
  public pivot: {
    event_id: string,
    account_id: string,
    name: string
  }

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
