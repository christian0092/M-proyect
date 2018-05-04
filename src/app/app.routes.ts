import {Routes,RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import { NosotrosComponent } from './nosotros/nosotros.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes=[
  {path:'',redirectTo:'/home', pathMatch: 'full'},
  {path:'home',component:HomeComponent},
  {path:'nosotros',component:NosotrosComponent},

];

export const routes:ModuleWithProviders=RouterModule.forRoot(appRoutes);
