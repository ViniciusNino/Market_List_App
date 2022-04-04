import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { USUARIO } from '../shared/usuario/constants';
import { IUsuario } from '../shared/usuario/interfaces';
import { HomeSolicitanteApi } from './home-solicitante.api';
import { ILista } from '../shared/Lista/interfaces';
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
    readonly homeSolicitanteApi: HomeSolicitanteApi
    ) {}

  async ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem(USUARIO.USUARIOAUTENTICAR));
    this.listas = await this.homeSolicitanteApi.getListPorUnidade(this.usuario.unidadeId);
  }

  public cadastrarNovaLista(){
    this.router.navigateByUrl(ROUTES_COMPONENTS.SOLICITACAO);
  }

  public selecionarLista(lista){
    this.router.navigate([ROUTES_COMPONENTS.LISTAR_ITENS], {queryParams: lista});
  }
}
