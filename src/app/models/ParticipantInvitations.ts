import { Deserializable } from "./deserializable.model";
import { Participant} from "./participant"

export class ParticipantInvitations extends Participant implements Deserializable {
   public sent:number
   public invitation_id:number

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
