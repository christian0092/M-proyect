export class Account {
  constructor(
    public id:number,
    public name:string,
    public image_name:string,
    public enabled:string,
    public pivot: {
        event_id: number,
        account_id: number,
        name: string
    }

  ){}
}
