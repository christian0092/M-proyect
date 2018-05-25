import {Routes,RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import { NosotrosComponent } from './nosotros/nosotros.component';
import { HomeComponent } from './home/home.component';
import { EventosComponent } from './eventos/eventos.component';
import { FormatosComponent } from './formatos/formatos.component';

const appRoutes: Routes=[
  {path:'',redirectTo:'/home', pathMatch: 'full'},
  {path:'home',component:HomeComponent},
  {path:'nosotros',component:NosotrosComponent},
  {path:'eventos',component:EventosComponent},
  {path:'formatos',component:FormatosComponent},
];

export const routes:ModuleWithProviders=RouterModule.forRoot(appRoutes);
