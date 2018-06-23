export class Participant {
	constructor(
		public id:string,
    public name:string,
    public status:number//0=sin invitar,1=Invitado,2=No disponible(Por la onda esa que no te molesten)
  ){}
}
