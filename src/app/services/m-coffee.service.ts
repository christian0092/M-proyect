import { Injectable } from '@angular/core';
import { Participant } from '../models/participant';
import { Headers, Http, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class MCoffeeService {
	DummyParticipantList:Participant[]=[
    new Participant('1','Christian Molina',0),
    new Participant('2','Fernanda Micakosky',0),
    new Participant('1','Christian Molina',0),
    new Participant('2','Fernanda Micakosky',0),
    new Participant('1','Christian Molina',0),
    new Participant('2','Fernanda Micakosky',0),
    new Participant('1','Christian Molina',0),
    new Participant('2','Fernanda Micakosky',0),
    new Participant('1','Christian Molina',0),
    new Participant('2','Fernanda Micakosky',0),
    new Participant('1','Christian Molina',0),
    new Participant('2','Fernanda Micakosky',0),
    new Participant('1','Christian Molina',0),
    new Participant('2','Fernanda Micakosky',0),
    new Participant('1','Christian Molina',0),
    new Participant('2','Fernanda Micakosky',0),
    new Participant('1','Christian Molina',0),
    new Participant('2','Fernanda Micakosky',0),
    new Participant('1','Christian Molina',0),
    new Participant('2','Fernanda Micakosky',0),
    new Participant('1','Christian Molina',0),
    new Participant('2','Fernanda Micakosky',0),
    new Participant('1','Christian Molina',0),
    new Participant('2','Fernanda Micakosky',0),
    new Participant('1','Christian Molina',4),
    new Participant('2','Fernanda Micakosky',4),
    new Participant('1','Christian Molina',4),
    new Participant('2','Fernanda Micakosky',4),
    new Participant('1','Christian Molina',4),
    new Participant('2','Fernanda Micakosky',4),
    new Participant('1','Christian Molina',4),
    new Participant('2','Fernanda Micakosky',4),
    new Participant('1','Christian Molina',4),
    new Participant('2','Fernanda Micakosky',4),
    new Participant('1','Christian Molina',4),
    new Participant('2','Fernanda Micakosky',4),
    new Participant('1','Christian Molina',4),
    new Participant('2','Fernanda Micakosky',4),
    new Participant('1','Christian Molina',4),
    new Participant('2','Fernanda Micakosky',4),
    new Participant('1','Christian Molina',4),
    new Participant('2','Fernanda Micakosky',4),
    new Participant('1','Christian Molina',4),
    new Participant('2','Fernanda Micakosky',4),
    new Participant('3','Jonathan Gomez',2),
    new Participant('4','Angeles Perez Angueria',2),
    new Participant('5','La señora de España',1),
    new Participant('6','Mel Gibson',1),
    new Participant('7','El retutu papa',1),
    new Participant('8','Completar cansa',2),
    new Participant('9','Jhon wick',1),
    new Participant('1','Christian Molina',1),
    new Participant('2','Fernanda Micakosky',1),
    new Participant('3','Jonathan Gomez',2),
    new Participant('4','Angeles Perez Angueria',2),
    new Participant('5','La señora de España',1),
    new Participant('1','Christian Molina',1),
    new Participant('2','Fernanda Micakosky',1),
    new Participant('3','Jonathan Gomez',2),
    new Participant('4','Angeles Perez Angueria',2),
    new Participant('5','La señora de España',1),
    new Participant('6','Mel Gibson',1),
    new Participant('7','El retutu papa',1),
    new Participant('8','Completar cansa',2),
    new Participant('9','Jhon wick',1),
    new Participant('1','Christian Molina',1),
    new Participant('2','Fernanda Micakosky',1),
    new Participant('3','Jonathan Gomez',2),
    new Participant('4','Angeles Perez Angueria',2),
    new Participant('5','La señora de España',1),
    new Participant('1','Christian Molina',1),
    new Participant('2','Fernanda Micakosky',1),
    new Participant('3','Jonathan Gomez',2),
    new Participant('4','Angeles Perez Angueria',2),
    new Participant('5','La señora de España',1),
    new Participant('6','Mel Gibson',1),
    new Participant('7','El retutu papa',1),
    new Participant('8','Completar cansa',2),
    new Participant('9','Jhon wick',1),
    new Participant('1','Christian Molina',1),
    new Participant('2','Fernanda Micakosky',1),
    new Participant('3','Jonathan Gomez',2),
    new Participant('4','Angeles Perez Angueria',2),
    new Participant('5','La señora de España',1),
 	]
	private participantList:Participant[]
	private participantListObservable$ = new Subject<Participant[]>();
  constructor(private http: Http) { }

  getParticipantList() {
     if(this.participantList==null){
     	this.loadParticipantList()    	
    }else {this.participantListChange(this.participantList)}
    
  }
	loadParticipantList() {
		//////aca va el http request
    this.participantListChange(this.DummyParticipantList)
  }
  getParticipantListObservable$(): Observable<Participant[]> {
    return this.participantListObservable$.asObservable();
  }

  public participantListChange(participantList: Participant[]) {
    this.participantListObservable$.next(participantList);
  }

}
