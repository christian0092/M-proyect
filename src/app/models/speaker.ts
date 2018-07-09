import { Deserializable } from "./deserializable.model";

export class Speaker implements Deserializable {

    public id:number
    public name:string
    public image:string
    public link_page:string
    public pivot:{
        activity_id:number,
        speaker_id:number,
        created_at:string,
        updated_at:string
    }

    deserialize(input: any) {
      Object.assign(this, input);
      return this;
    }

}
