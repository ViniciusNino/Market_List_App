import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitacaoPageRoutingModule } from './solicitacao-routing.module';

import { SolicitacaoPage } from './solicitacao.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitacaoPageRoutingModule
  ],
  declarations: [SolicitacaoPage]
})
export class SolicitacaoPageModule {}
