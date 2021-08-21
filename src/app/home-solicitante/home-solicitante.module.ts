import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeSolicitantePageRoutingModule } from './home-solicitante-routing.module';

import { HomeSolicitantePage } from './home-solicitante.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeSolicitantePageRoutingModule
  ],
  declarations: [HomeSolicitantePage]
})
export class HomeSolicitantePageModule {}
