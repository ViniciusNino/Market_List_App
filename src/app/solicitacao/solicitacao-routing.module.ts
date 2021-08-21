import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolicitacaoPage } from './solicitacao.page';

const routes: Routes = [
  {
    path: '',
    component: SolicitacaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicitacaoPageRoutingModule {}
