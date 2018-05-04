import {Routes,RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import { NosotrosComponent } from './nosotros/nosotros.component';
import { HomeComponent } from './home/home.component';
import { EventosComponent } from './eventos/eventos.component';

const appRoutes: Routes=[
  {path:'',redirectTo:'/home', pathMatch: 'full'},
  {path:'home',component:HomeComponent},
  {path:'nosotros',component:NosotrosComponent},
  {path:'eventos',component:EventosComponent},
];

export const routes:ModuleWithProviders=RouterModule.forRoot(appRoutes);
