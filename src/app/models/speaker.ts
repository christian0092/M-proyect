export class Speaker {
  constructor(
    public id:number,
    public name:string,
    public image:string,
    public link_page:string,
    public pivot:{
        activity_id:number,
        speaker_id:number,
        created_at:string,
        updated_at:string
    }

  ){}
}
