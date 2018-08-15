import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarVerticalPosition } from '@angular/material';
import { SuccessfulComponent } from './successful/successful.component'
import { WarningComponent } from './warning/warning.component'
import { ErrorComponent } from './error/error.component'
import { InfoComponent } from './info/info.component'
import { SnackBarServicesService } from '../services/snack-bar-services.service'

@Component({
  selector: 'app-snack-bar-notification',
  templateUrl: './snack-bar-notification.component.html',
  styleUrls: ['./snack-bar-notification.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SnackBarNotificationComponent implements OnInit {

  constructor(public snackBar: MatSnackBar, private snackBarServicesService: SnackBarServicesService) { }

  ngOnInit() {

    this.snackBarServicesService.getNotificationObservable$().subscribe(
      data => {
        if (data[0] == "successful") { this.successful() }
        else if (data[0] == "warning") { this.warning() }
        else if (data[0] == "error") { this.error() }
        else if (data[0] == "info") { this.info() }
      })
  }
  successful() {
    let config = new MatSnackBarConfig();
    config.extraClasses = ['successful-snackbar'];
    config.duration = 3000;
    this.snackBar.openFromComponent(SuccessfulComponent,config)
  }
  warning() {
    let config = new MatSnackBarConfig();
    config.panelClass = ['warning-snackbar'];
    config.duration = 3000;
    this.snackBar.openFromComponent(WarningComponent, config)
  }
  error() {
    let config = new MatSnackBarConfig();
    config.extraClasses = ['error-snackbar'];
    config.duration = 3000;
    this.snackBar.openFromComponent(ErrorComponent, config)
  }

  info() {
    let config = new MatSnackBarConfig();
    config.extraClasses = ['info-snackbar'];
    config.duration = 3000;
    this.snackBar.openFromComponent(InfoComponent, config)
  }
}
