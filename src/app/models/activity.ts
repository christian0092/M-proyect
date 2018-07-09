import { Speaker } from '../models/speaker';
import { Status } from '../models/status';
import { Event_format } from '../models/event_format';
import { Room } from '../models/room';
import { Deserializable } from "./deserializable.model";

export class Activity implements Deserializable{

    public id:number
    public name:string
    public description:string
    public event_id:number
    public room_id:number
    public event_format_id:number
    public day:string
    public start_time:string
    public end_time:string
    public status_id:number
    public speakers:Speaker[]
    public status:Status
    public event_format:Event_format
    public room:Room

    constructor(){}

    deserialize(input: any) {
      Object.assign(this, input);
      this.speakers = input.speakers.map((speakers: Speaker) => new Speaker().deserialize(speakers));
      this.status = new Status().deserialize(input.status);
      this.event_format = new Event_format().deserialize(input.event_format);
      this.room = new Room().deserialize(input.room);
      return this;
    }
}
