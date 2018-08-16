import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { routes } from './app.routes';
import { FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from "@angular/forms";
import {QRCodeModule} from 'angularx-qrcode'

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { PageRegistroComponent } from './page-registro/page-registro.component';

import { NosotrosComponent } from './nosotros/nosotros.component';
import { HomeComponent } from './home/home.component';
import { ContactoComponent } from './contacto/contacto.component';
import { EventosComponent } from './eventos/eventos.component';
////////////////////////////////////////////////////////////////////////////

//////////////////////////////Servicios//////////////////////////////////////////////
import { PartnerRequestService } from './eventos/partner-request-form/partner-request.service';
import { LoginService } from './services/login.service';
import { RegisterService } from './login/register/register.service';
import {UserService} from './services/user.service';
import { StudyLevelsService } from "./services/study-levels.service";
import { ProfessionLevelsService } from "./services/profession-levels.service";
import { CountriesService } from "./services/countries.service";
import { AccountsService } from "./services/accounts.service";
import { EventosService } from "./eventos/eventos.service";
import { ActividadService } from "./eventos/actividad/actividad.service";
import { VerificarCorreoService } from "./verificar-correo/verificar-correo.service";
import {MSummitService} from "./services/m-summit.service"
import {FileUploadClientServiceService} from "./services/file-upload-client-service.service"
import {FileServiceService} from "./services/file-service.service"
import {PreviousRouteService} from "./services/previous-route.service"
import {MCoffeeService} from "./services/m-coffee.service"
/////////////////////////////////////////////////////////////////////////////

import { LoginComponent } from './login/login/login.component';
import { FormatosComponent } from './formatos/formatos.component';
import { LogoutComponent } from './login/login/logout.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ModalCoffeeComponent } from './perfil/modal-coffee.component';
import { RegisterComponent } from './login/register/register.component';
import { RegisterEmpresaComponent } from './login/register/register-empresa/register-empresa.component';
import { RegisterPersonaComponent } from './login/register/register-persona/register-persona.component';
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';
import { PartnerRequestFormComponent } from './eventos/partner-request-form/partner-request-form.component';
import { MSummitComponent } from './perfil/m-summit/m-summit.component';
import { MSummit2Component } from './perfil/m-summit2/m-summit2.component';

import { ActividadComponent } from './eventos/actividad/actividad.component';
import { ParticipantComponent } from './perfil/participant/participant.component';
import { VerificarCorreoComponent } from './verificar-correo/verificar-correo.component';
import { RegistrationComponent } from './login/registration/registration.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RefreshTokenInterceptor } from './login/refresh-token.interceptor';
import { AplicationErrorHandle } from './app.error-handle';
import { ResponsePasswordResetComponent } from './login/response-password-reset/response-password-reset.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    PageRegistroComponent,
    NosotrosComponent,
    HomeComponent,
    ContactoComponent,
    EventosComponent,
    LoginComponent,
    FormatosComponent,
    LogoutComponent,
    PerfilComponent,
    ModalCoffeeComponent,
    RegisterComponent,
    RegisterEmpresaComponent,
    RegisterPersonaComponent,
    ResetPasswordComponent,
    PartnerRequestFormComponent,
    MSummitComponent,
    MSummit2Component,
    ActividadComponent,
    ParticipantComponent,
    VerificarCorreoComponent,
    RegistrationComponent,
    ResponsePasswordResetComponent,

  ],
  imports: [
    routes,
    FormsModule,
    HttpModule,
    BrowserModule,
    ReactiveFormsModule,
      QRCodeModule
  ],
  providers: [
    LoginService,
    PartnerRequestService,
    RegisterService,
    UserService,
    StudyLevelsService,
    AccountsService,
    EventosService,
    ActividadService,
    VerificarCorreoService,
    ProfessionLevelsService,
    CountriesService,
    MSummitService,
    FileUploadClientServiceService,
    FileServiceService,
    PreviousRouteService,
    MCoffeeService,
    {provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true },
    {provide: ErrorHandler, useClass: AplicationErrorHandle }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
