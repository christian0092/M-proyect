import { Component, OnInit, Input, ViewChild, ElementRef, NgModule } from '@angular/core';
import { Participant } from '../models/participant';
import { Actividad } from '../models/actividad';
import { Interests } from '../models/interests';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ParticipantComponent } from '../perfil/participant/participant.component';
import { Profile } from '../models/profile';
import { LoginService } from '../services/login.service'
import { Router, NavigationEnd } from '@angular/router';
import * as jspdf from 'jspdf'
import * as html2canvas from "html2canvas"
import {SnackBarServicesService} from '../services/snack-bar-services.service'
import {environment} from '../../environments/environment'


import { EventosService } from '../eventos/eventos.service';
import { ActividadService } from '../eventos/actividad/actividad.service';

import { Activity } from '../models/activity';
import { Event } from '../models/event';
import { Partner } from '../models/partner';
import { Organizer } from '../models/organizer';
import { Account } from '../models/account';
import { Speaker } from '../models/speaker';
import { Event_format } from '../models/event_format';
import { QRCodeModule } from 'angularx-qrcode';

import { Person } from '../models/person';
import { Organization } from '../models/organization';
import { Subscription } from 'rxjs';

import { onFileChange, checkSize, checkFileType } from '../Decorators/fileUploadDecorator'
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { maxFileSize, fileType } from '../customValidators/customValidators'
import { FileUploadClientServiceService } from '../services/file-upload-client-service.service'

/////////////////////////////////qr///////////////////////
@NgModule({
  declarations: [
  ],
  imports: [
    QRCodeModule,
  ],
  providers: [],
})
//////////////////////////////////////////////////////////////////

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  observable$: Observable<JSON>;
  listaIntereses: Array<Interests> = [];
  isLogged: boolean;
  isLogged$: Observable<boolean>;

  public listaAccounts: Account[];
  ParticipantList: Participant[];

  public myProfile: Profile;
  public myProfile$: Observable<Profile>;

  public person: Person = new Person();
  public organization: Organization = new Organization();
  personLogged: boolean //= false;
  isMisEvent: Event[];
  public actividad: Activity;
  agenda: Activity[];
  agenda$: Observable<Activity[]>;

  ocultar;

  public evento: Event;
  public eventoAccounts: Account[];
  errorEvento;
  public summitLogged;
  ////////////////////////variables para cambiar avatar///////////////////////////
  @ViewChild('avatarInput') avatarInput: ElementRef;
  avatarFile: File
  formAvatar: FormGroup;
  errorSize: string
  errorType: string
  loading: boolean = false
  send: boolean = false
  success: boolean = false
  noError: boolean = true
  errorInfo: string = ''
  buttonEditAvatar: boolean = true
  imageSrc
  ///////////////////////////////variables para coffee////////////////////////////
  public coffeeLogged
  public coffeeId
  ////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////////variables para qr////////////////////////////
  myAngularxQrCode: string=''
  @ViewChild("descargaQr", { read: ElementRef }) descargaQr: ElementRef;
  ////////////////////////////////////////////////////////////////////////////////

  constructor(
    private userService: UserService,
    private loginService: LoginService,
    private router: Router,
    private eventosServices: EventosService,
    private actividadServices: ActividadService,
    private fb: FormBuilder,
    private fileUploadClientService: FileUploadClientServiceService,
    private snack:SnackBarServicesService
  ) {
    this.createAvatarForm()
  }

  ngOnInit() {
    this.isLogged$ = this.loginService.isLogin$();
    this.isLogged$.subscribe(login => { this.isLogged = login; });
    this.isLogged = this.loginService.isLogin()
    this.doInit();
  }

  doInit() {
    if (this.isLogged == true) {
      this.myProfile$ = this.userService.getMyProfile();
      this.myProfile$.subscribe(profile => { this.loadProfile(profile) });
      // this.userService.changeMyProfile()
      this.myProfile = this.userService.getProfile()
      this.loadProfile(this.myProfile)
      this.loadMisEvento();
      this.agenda$ = this.actividadServices.subscribeActivitiesObserver();
      this.agenda$.subscribe(inActivities => { this.agenda = inActivities; });
    }
    else {
      //this.router.navigate(['/home'])
    }
  }

  loadProfile(profile: Profile) {
    if (profile != null) {
      this.myProfile = profile;
      this.myAngularxQrCode="id:"+this.myProfile.id
      //console.log(this.myAngularxQrCode)
      if (profile.organization != null) {
        this.organization = profile.organization
        this.personLogged = false
      }
      if (profile.person != null) {
        this.person = profile.person
        this.personLogged = true
      }
      if (profile.interests != null) { this.listaIntereses = profile.interests; }
      if (profile.accounts != null) { this.listaAccounts = profile.accounts; }
    }
  }

  loadMisEvento() {
    this.eventosServices.misEvent().subscribe(events => {
      this.isMisEvent = events;
      if (this.isMisEvent.length > 0) {
        this.loadEvento();
        this.errorEvento = false;
      }
      else {
        this.evento = null;
        this.eventoAccounts = null;
        this.errorEvento = true;
        this.ocultar = true;
      }
    });
  }

  getErrorEvento() {
    return this.errorEvento;
  }

  loadEvento() {
    this.eventosServices.getEvent().subscribe(events => {
      this.evento = events[0];
      this.eventoAccounts = this.evento.accounts
      this.agenda = this.actividadServices.getMyActivities();
      if (this.agenda == null) {
        this.actividadServices.loadMyActivities(this.evento.id).subscribe(
          activities => {
            this.agenda = activities['data']
            this.actividadServices.ActivitiesChange(activities['data'])
            this.summitLogged = this.actividadServices.hasSummit();
            this.coffeeLogged = this.actividadServices.hasCoffe()
            if (this.coffeeLogged) { this.coffeeId = this.actividadServices.getCoffe() }
          }
        );
      }
      this.summitLogged = this.actividadServices.hasSummit();
      this.coffeeLogged = this.actividadServices.hasCoffe()
      if (this.coffeeLogged) { this.coffeeId = this.actividadServices.getCoffe() }
    });
  }
  /*
    mostrarApartado() {
      if (this.agenda != null) {
        let act = this.agenda.find(x => x.event_format_id === 3);
        if (act !== undefined) {
          if (act.event_format_id == 3) {
            this.summitLogged = true;
            return;
          }
        }
      }
      this.summitLogged = false;
    }*/

  onAbandonar(data) {
    this.eventosServices.deleteEventUser(data).subscribe(
      data => {
        if (data['success']) {
          this.errorEvento = true;
          this.summitLogged = false;
          this.agenda = [];
          this.eventosServices.changeMisEventValue([]);
          this.actividadServices.ActivitiesChange([]);
          this.loadMisEvento();
        }
      });
  }

  getVer(formato) {
    if (formato == 7 || formato == 8) return false;
    else return true;
  }

  getActividad(actividad) {
    this.actividad = actividad;
    this.actividadServices.onActivityclickchange(this.actividad);
  }

  verAgendaCompleta() {
    this.router.navigate(['/eventos'])
  }


  //////////////////////////////////////funciones para cambiar imagen//////////////////////////////////
  onFileChange(event) {
    let { file: avatarFile, form: formAvatar } = onFileChange(event, this.avatarFile, this.formAvatar)
    this.avatarFile = avatarFile
    this.formAvatar = formAvatar
    //console.log(this.formAvatar)
    //console.log(this.avatarFile)
    //console.log('Tamaño de Archivos'+this.formAvatar.controls['fileData'].get('fileSize').valid)
    //console.log('Formato de archivo:'+this.formAvatar.controls['fileData'].get('fileName'i).vald)
    if (this.formAvatar.valid) {
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;
      reader.readAsDataURL(this.avatarFile);
    }
  }

  createAvatarForm() {
    this.formAvatar = this.fb.group({
      fileData: this.fb.group({
        fileName: ['', Validators.compose([Validators.required, fileType(['png', 'jpg', 'jpeg', 'gif'])])],
        fileType: [''],
        fileSize: ['', Validators.compose([Validators.required, maxFileSize(1024 * 1024 * 15)])],
      })
    })
  }

  checkSize() {
    let { error: error, errorInfo: errorInfo } = checkSize('fileData', 'fileSize', this.formAvatar)
    if (error) {
      this.errorSize = errorInfo
    }
    return error
  }

  checkType() {
    let { error: error, errorInfo: errorInfo } = checkFileType('fileData', 'fileName', this.formAvatar)
    if (error) {
      this.errorType = errorInfo
    }
    //console.log('error de formato'+error)
    //console.log('Info de error'+errorInfo)
    return error
  }

  refreshProfile() {
    this.userService.getMyProfile2().subscribe(
      profile => this.userService.changeMyProfile(profile)
    )
  }

  changeAvatar() {
    if (this.formAvatar.valid && this.avatarFile) {
      this.send = true;
      this.noError = true
      this.success = false
      this.loading = true;

      this.fileUploadClientService.changeAvatar(
        this.avatarFile,
        this.formAvatar).subscribe(
          event => {
            this.snack.notificationChange(["successful","Imagen guardada correctamente"])
            this.send = false
            this.success = true
            this.loading = false
            this.noError = true
            this.avatarInput.nativeElement.value = ""
            this.editAdvatar()
            this.refreshProfile()
            this.formAvatar.reset()
          },
          error => {
            this.snack.notificationChange(["error",error.message])
            this.send = false
            this.success = false
            this.noError = false;
            this.loading = false;
            this.errorInfo = error.message
            //console.log(error)
          });
    } else if (this.formAvatar.invalid && this.avatarFile == null) {
      this.success = true
      this.loading = false
      this.noError = false
      this.snack.notificationChange(["warning","Compruebe que el archivo cumple con los requisitos"])
      this.errorInfo = "Se produjo un error, compruebe que esta logueado y los campos estan completos"
    }

  }

  clearFile() {
    this.formAvatar.reset()
    this.avatarFile = null;
    this.send = false;
    this.success = false
    this.noError = true;
    this.imageSrc = null
    this.avatarInput.nativeElement.value = ""
    //console.log(this.formAvatar)
    //console.log(this.avatarFile)
    this.editAdvatar()
  }

  editAdvatar() {
    this.buttonEditAvatar = !this.buttonEditAvatar
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////Funciones para descarga de qr/////////////////////////////////////////

  downloadPdf() {


    /*var imgData
    html2canvas(this.descargaQr.nativeElement).then(canvas => {
      imgData = canvas.toDataURL("image/png");
      let doc = new jspdf('portrait', 'pt', 'a4', 1);
      doc.addImage(imgData, 50, 0, 1037 * 1.5, 404 * 1.5)
      doc.save('test.pdf')
    });*/

    var imgData
    
    html2canvas(this.descargaQr.nativeElement).then(canvas => {
      imgData = canvas.toDataURL("image/png");
      let doc = new jspdf('portrait', 'pt', 'a6', 1);
      doc.setDrawColor( 10 , 86 , 134 );
      doc.setFillColor( 10 , 86 , 134 );
      doc.rect( 7 , 12 , 285 , 90 , 'FD' );

      doc.setFontSize(12);
      doc.setTextColor(255,255,255);
      doc.setFontType("bold");
      doc.text(this.person.name+" "+this.person.surname, 10,30)
      doc.text(this.evento.name, 10,50)
      doc.text('Fecha: '+this.evento.start_date, 10,70)
      doc.text('Lugar: '+this.evento.event_place+ ', Valparaíso, CHILE', 10,90)
      doc.addImage(imgData, 10, 110,300,300);
      doc.save('QR-'+this.evento.name);
      this.snack.notificationChange(["successful","Creando pdf"])
    });

    /*let doc = new jspdf();
    doc.text('hola', 10,10)
    doc.save('test.pdf')*/
  }
  /////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////Notificacion///////////////////////////////////////////////
createNotification(){
 //this.snack.notificationChange("hola")
}
////////////////////////////////////////////////////////////////////////////////
}
