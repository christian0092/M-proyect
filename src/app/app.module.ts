import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routes } from './app.routes';
import { FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { PageRegistroComponent } from './page-registro/page-registro.component';

import { NosotrosComponent } from './nosotros/nosotros.component';
import { HomeComponent } from './home/home.component';
import { ContactoComponent } from './contacto/contacto.component';
import { EventosComponent } from './eventos/eventos.component';

import { LoginService } from './services/login.service';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './login/login.component';
import { ModalLoginComponent } from './login/modal-login.component';
import { FormatosComponent } from './formatos/formatos.component';
import { LogoutComponent } from './login/logout.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ModalCoffeeComponent } from './perfil/modal-coffee.component';

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
    ModalLoginComponent,
    FormatosComponent,
    LogoutComponent,
    PerfilComponent,
    ModalCoffeeComponent
  ],
  imports: [
    routes,
    FormsModule,
    HttpModule,
    BrowserModule
  ],
  providers: [LoginService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
