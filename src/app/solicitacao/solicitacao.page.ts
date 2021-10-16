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
  itens: IItem[];
  usuarioLogado: IUsuario;

  constructor(
    readonly solicitacaoApi: SolicitacaoApi,
    private router: Router,
    ){}
    
    ngOnInit() {
    this.usuarioLogado = JSON.parse(localStorage.getItem(USUARIO.USUARIOAUTENTICAR));
    this.listar_itens()
  }

  async listar_itens()
  {
    this.itens = await this.solicitacaoApi.getItemPorUnidade(this.usuarioLogado.unidadeId);
  }

  async confirmar()
  {
    const itensParaCompra = this.montarListaCompra(this.itens)
    if(itensParaCompra.length > 0){
      const salvo = await this.solicitacaoApi.postItensParaComprar(itensParaCompra);
      if(salvo){
        this.cancelar()
      }
    } else{
      alert("Selecione no mínimo 1 item para compra.")
    }
  }

  cancelar()
  {
    this.router.navigateByUrl("home-solicitante");
  }

  montarListaCompra(itens: IItem[])
  {
    let itensParaCompra: IItem[];    
    itens.forEach(element => {
      if(element.quantidade != 0){
        element.usuarioLogadoId = this.usuarioLogado.id;
        itensParaCompra.push(element);
      }
    });
    return itensParaCompra;
  }
}
