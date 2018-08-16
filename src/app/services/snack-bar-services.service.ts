import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class SnackBarServicesService {
	private notificationObservable$ = new Subject<String[]>();
	private message:String[]=["nothing","nothing"]


	constructor() { 
	}
	public notificationChange(message: String[]) {
		this.message = message;
		this.notificationObservable$.next(this.message);
	}
	getMessage(){
		return this.message
	}
	getNotificationObservable$(): Observable<String[]> {
        return this.notificationObservable$.asObservable();
    }
}
