import { Component, OnInit } from '@angular/core';
import { Router, ROUTES } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { USUARIO } from '../shared/usuario/constants';
import { IUsuario } from '../shared/usuario/interfaces';
import { HomeSolicitanteApi } from './home-solicitante.api';
import { ILista } from '../shared/Lista/interfaces';
import { NavController } from '@ionic/angular';
import { ROUTES_COMPONENTS } from '../app-const.route';

@Component({
  selector: 'app-home-solicitante',
  templateUrl: './home-solicitante.page.html',
  styleUrls: ['./home-solicitante.page.scss'],
})
export class HomeSolicitantePage implements OnInit {
  public usuario: IUsuario;
  public listas: ILista[];

  constructor (
    private router: Router,
    private navCtrl: NavController,
    readonly homeSolicitanteApi: HomeSolicitanteApi
    ) {}

  async ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem(USUARIO.USUARIOAUTENTICAR));
    this.listas = await this.homeSolicitanteApi.getListPorUnidade(this.usuario.unidadeId)
  }
  
  public cadastrarNovaLista(){
    this.router.navigateByUrl("solicitacao");
  }

  public selecionarLista(lista){
    this.router.navigate([ROUTES_COMPONENTS.LISTAR_ITENS], {queryParams: lista});
  }
}
