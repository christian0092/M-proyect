import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SnackBarServicesService } from '../../services/snack-bar-services.service'

@Component({
	selector: 'app-successful',
	templateUrl: './successful.component.html',
	styleUrls: ['./successful.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class SuccessfulComponent implements OnInit {
	public message:String
	constructor(private snackBarServicesService: SnackBarServicesService) { }

	ngOnInit() {
		let messageArray=this.snackBarServicesService.getMessage()
		this.message=messageArray[1]
	}

}
