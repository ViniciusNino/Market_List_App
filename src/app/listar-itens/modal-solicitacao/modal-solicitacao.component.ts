import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { USUARIO } from '../../shared/usuario/constants';
import { SolicitacaoApi } from 'src/app/solicitacao/socilitacao.api';
import { IItem } from 'src/app/shared/item/item.interfaces';
import { IUsuario } from 'src/app/shared/usuario/interfaces';
import { IItemLista } from 'src/app/shared/itemLista/interfaces';

@Component({
  selector: 'app-modal-solicitacao',
  templateUrl: './modal-solicitacao.component.html',
  styleUrls: ['./modal-solicitacao.component.scss'],
})
export class ModalSolicitacaoComponent implements OnInit {
  usuarioAutenticado: IUsuario;
  itens: IItem[];
  listaId: number;
  itensListaNovo: IItemLista[];

  constructor(
    private modalCtrl: ModalController,
    readonly solicitacaoApi: SolicitacaoApi
    ) { }

  async ngOnInit() {
    this.usuarioAutenticado = JSON.parse(localStorage.getItem(USUARIO.USUARIOAUTENTICAR));
    this.itens = await this.solicitacaoApi.getItemPorUnidade(this.usuarioAutenticado.unidadeId);
    this.preencherItensListaNovo(this.itens);
  }
  
  preencherItensListaNovo(itens: IItem[]) {
    if (this.itensListaNovo.length) {
      this.itensListaNovo.forEach(itemListaNovo => {
        itens.find(x => x.id == itemListaNovo.itemId).quantidade = itemListaNovo.quantidade;
      });
    }
  }

  public adicionar(itens: IItem[]){
    
    let itensListaNova = [] as IItemLista[];
    const itensNovo = itens.filter(x => x.quantidade > 0);
    if(itensNovo.length) {
      itensNovo.forEach(item => {
        let itemLista = {
          usuarioLogadoId: this.usuarioAutenticado.id,
          itemId: item.id,
          quantidade: item.quantidade,
          nome: item.nome,
          unidadeMedida: item.unidadeMedida,
          listaId: this.listaId
        } as IItemLista;
        itensListaNova.push(itemLista);
      });
      this.modalCtrl.dismiss({
        itensListaNovo: itensListaNova,
        itemAdicionado: true
      });
    } else {
      alert('Selecione no mínimo 1 item para adicionar.')
    }
  }

  async cancelar() {
    await this.modalCtrl.dismiss();
  }
}
