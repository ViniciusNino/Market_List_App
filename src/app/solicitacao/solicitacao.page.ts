import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { USUARIO } from '../shared/usuario/constants';
import { IUsuario } from '../shared/usuario/interfaces';
import { IItem } from '../shared/item/item.interfaces';
import { SolicitacaoApi } from './socilitacao.api';
import { IItemLista } from '../shared/itemLista/interfaces';

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
  
  montarListaCompra(itens: IItem[])
  {
    let itensListaNovo = [] as IItemLista[];    
    const itensSelecionados = itens.filter(x => x.quantidade > 0);    
    itensSelecionados.forEach(item => {
      let itemLista = {} as IItemLista;
      itemLista.usuarioLogadoId = this.usuarioLogado.id;
      itemLista.quantidade = item.quantidade;
      itemLista.itemId = item.id;
      itensListaNovo.push(itemLista);
    });
    return itensListaNovo;
  }

  cancelar() {
    this.router.navigateByUrl("home-solicitante");
  }
}
