import {Routes,RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { HomeComponent } from './home/home.component';
import { EventosComponent } from './eventos/eventos.component';
import { FormatosComponent } from './formatos/formatos.component';
import { PerfilComponent } from './perfil/perfil.component';
import { VerificarCorreoComponent } from './verificar-correo/verificar-correo.component';
import { LoginComponent } from './login/login/login.component';
import { RegistrationComponent } from './login/registration/registration.component';
import { ResponsePasswordResetComponent } from './login/response-password-reset/response-password-reset.component';

const appRoutes: Routes=[
  {path:'',redirectTo:'/home', pathMatch: 'full'},
  {path:'home',component:HomeComponent},
  {path:'nosotros',component:NosotrosComponent},
  {path:'eventos',component:EventosComponent},
  {path:'formatos',component:FormatosComponent},
  {path:'perfil',component:PerfilComponent},
  {path:'verificar-correo/:code',component:VerificarCorreoComponent},
  {path:'login',component:LoginComponent},
  {path:'registration',component:RegistrationComponent},
  {path:'response-password-reset',component:ResponsePasswordResetComponent}
];

export const routes:ModuleWithProviders=RouterModule.forRoot(appRoutes);
