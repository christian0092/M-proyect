import { Component, OnInit } from '@angular/core';
import { SnackBarServicesService } from '../../services/snack-bar-services.service'

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
 public message:String
	constructor(private snackBarServicesService: SnackBarServicesService) { }

	ngOnInit() {
		let messageArray=this.snackBarServicesService.getMessage()
		this.message=messageArray[1]
	}

}
