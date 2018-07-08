import { Speakers } from '../models/speakers';
import { Status } from '../models/status';
import { Event_format } from '../models/event_format';
import { Room } from '../models/room';

export class Activity {
  constructor(
            public id:string,
            public name:string,
            public description:string,
            public event_id:string,
            public room_id:string,
            public event_format_id:string,
            public day:string,
            public start_time:string,
            public end_time:string,
            public status_id:string,
            public speakers:Speakers[],
            public status:Status,
            public event_format:Event_format,
            public room:Room

  ){}
}
