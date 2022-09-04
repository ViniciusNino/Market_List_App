import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { USUARIO } from '../shared/usuario/constants';
import { IUsuario } from '../shared/usuario/interfaces';
import { IItem } from '../shared/item/item.interfaces';
import { SolicitacaoApi } from './socilitacao.api';
import { IItemLista } from '../shared/itemLista/interfaces';
import { ROUTES_COMPONENTS } from '../app-const.route';
import { MENSAGEM_SOLICITACAO } from './solicitacao.const';
import { ILista } from '../shared/Lista/interfaces';

@Component({
  selector: 'app-solicitacao',
  templateUrl: './solicitacao.page.html',
  styleUrls: ['./solicitacao.page.scss'],
})
export class SolicitacaoPage implements OnInit {
  itens: IItem[];
  lista: ILista;
  usuarioLogado: IUsuario;

  constructor(
    readonly solicitacaoApi: SolicitacaoApi,
    private router: Router,
    ){}
    
    ngOnInit() {
    this.usuarioLogado = JSON.parse(localStorage.getItem(USUARIO.USUARIOAUTENTICAR));
    this.listar_itens();
    this.lista = this.montarLista();
  }

  async listar_itens() {
    this.itens = await this.solicitacaoApi.getItemPorUnidade(this.usuarioLogado.unidadeId);
  }

  montarLista = (): ILista => {
    const lista = {
      id: 0,
      usuarioId: this.usuarioLogado.id,
      unidadeId: this.usuarioLogado.unidadeId,
      nome: '',
      nomeUsuario: '',
      cadastro: null,
      itensLista: []
    }
    
    return lista;
  }

  async confirmar(lista: ILista)
  {    
    lista.itensLista = this.montarListaCompra(this.itens)
    if(lista.itensLista.length > 0 && lista.nome){
      const salvo = await this.solicitacaoApi.postItensParaComprar(lista);
      if(salvo){
        this.cancelar()
      }
    } else {
      this.montarAlerta(lista);
    }
  }

  montarAlerta(lista: ILista) {
    let mensagem = '';
    if (!lista.itensLista.length) {
      mensagem = MENSAGEM_SOLICITACAO.ITEM_COMPRA_VAZIO;
    } if (!lista.nome) {
      if (mensagem) {
        mensagem = mensagem + ' e ';
      }
      mensagem = mensagem + MENSAGEM_SOLICITACAO.NOME_LISTA_VAZIO + '.';
    }
    alert(mensagem);
  }
  
  montarListaCompra(itens: IItem[])  {
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
    this.router.navigateByUrl(ROUTES_COMPONENTS.HOME_SOLICITANTE)
               .then(nav => {
                 window.location.reload();
            });
  }
}
