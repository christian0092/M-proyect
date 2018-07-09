import { Deserializable } from "./deserializable.model";

export class Organizer implements Deserializable {
  public id: string
  public event_id: string
  public name: string
  public logo: string
  public link_page: string

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
