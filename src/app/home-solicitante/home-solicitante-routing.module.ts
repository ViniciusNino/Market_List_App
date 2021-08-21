import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeSolicitantePage } from './home-solicitante.page';

const routes: Routes = [
  {
    path: '',
    component: HomeSolicitantePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeSolicitantePageRoutingModule {}
