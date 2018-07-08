import { Speakers } from '../models/speakers';
import { Status } from '../models/status';
import { Event_format } from '../models/event_format';
import { Room } from '../models/room';

export class Activity {
  constructor(
            public id:number,
            public name:string,
            public description:string,
            public event_id:number,
            public room_id:number,
            public event_format_id:number,
            public day:string,
            public start_time:string,
            public end_time:string,
            public status_id:number,
            public speakers:Speaker[],
            public status:Status,
            public event_format:Event_format,
            public room:Room

  ){}
}
