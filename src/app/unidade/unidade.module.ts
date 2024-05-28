import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UnidadePageRoutingModule } from './unidade-routing.module';
import { UnidadePage } from './unidade.page';
import { ToastModule } from 'src/service/toast/toast.module';
import { LoaderModule } from 'src/service/loader/loader.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ToastModule,
    LoaderModule,
    UnidadePageRoutingModule
  ],
  declarations: [UnidadePage]
})
export class UnidadePageModule {}
