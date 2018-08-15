import { Component, OnInit } from '@angular/core';
import { SnackBarServicesService } from '../../services/snack-bar-services.service'

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  public message:String
	constructor(private snackBarServicesService: SnackBarServicesService) { }

	ngOnInit() {
		let messageArray=this.snackBarServicesService.getMessage()
		this.message=messageArray[1]
	}
}
