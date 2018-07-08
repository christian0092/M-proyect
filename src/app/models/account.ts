export class Account {
  constructor(
    public id:string,
    public name":string,
    public image_name:string,
    public enabled:string,
    public pivot: {
        event_id: string,
        account_id: string,
        name: string
    }

  ){}
}
