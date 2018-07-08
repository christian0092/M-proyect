export class Speaker {
  constructor(
    public id:string,
    public name:string,
    public image:string,
    public link_page:string,
    public pivot: {
        activity_id:string,
        speaker_id:string,
        created_at:string,
        updated_at:string
    }

  ){}
}
