import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router';
import { USUARIO } from '../shared/usuario/constants';
import { IUsuario } from '../shared/usuario/interfaces';
import { API } from 'src/environments/environment';
import { IItem } from '../shared/item/item.interfaces';
import { SolicitacaoApi } from './socilitacao.api';

@Component({
  selector: 'app-solicitacao',
  templateUrl: './solicitacao.page.html',
  styleUrls: ['./solicitacao.page.scss'],
})
export class SolicitacaoPage implements OnInit {
  private API_URL = API;
  itens: IItem[];
  usuarioLogado: IUsuario;

  constructor(
    readonly solicitacaoApi: SolicitacaoApi,
    private router: Router,
    private http: HttpClient
    ){}
    
    ngOnInit() {
    this.usuarioLogado = JSON.parse(localStorage.getItem(USUARIO.USUARIOAUTENTICAR));
    this.listar_itens()
  }

  async listar_itens()
  {
    this.itens = await this.solicitacaoApi.getItemPorUnidade(this.usuarioLogado.unidadeId);
  }

  public confirmar()
  {
    let vmItem = []
    this.itens.forEach(element => {
      if(element.quantidade != 0){
        element.usuarioLogadoId = this.usuarioLogado.id;
        vmItem.push(element)
      }
    });
    if(vmItem.length > 0){
      this.http.post(this.API_URL+"ItemLista/Post", vmItem).subscribe((response) => {
        if(response == true){
          this.router.navigateByUrl("home-solicitante");
        }
      });
    }else{
      alert("Selecione no mínimo 1 item para compra.")
    }
  }

  public cancelar()
  {
    this.router.navigateByUrl("home-solicitante");
  }
}
