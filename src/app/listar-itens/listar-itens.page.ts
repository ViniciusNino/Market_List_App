import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { HttpClient } from '@angular/common/http'
import { AlertController, ModalController } from '@ionic/angular'
import { ModalSolicitacaoComponent } from './modal-solicitacao/modal-solicitacao.component'
import { IItemLista } from '../shared/itemLista/interfaces'
import { ILista } from '../shared/Lista/interfaces'
import { ListarItensApi } from './listar-itens.api'
import { ROUTES_COMPONENTS } from '../app-const.route'
import { StatusItemLista } from '../shared/itemLista/enum'

@Component({
  selector: 'app-listar-itens',
  templateUrl: './listar-itens.page.html',
  styleUrls: ['./listar-itens.page.scss'],
})
export class ListarItensPage implements OnInit {
  private API_URL = 'http://localhost:5000/'
  lista: ILista;
  itensListaNovo: IItemLista[];
  itensListaApi: IItemLista[];
  teveAlteracao: boolean = false;

  constructor(
    readonly listarItensApi: ListarItensApi,
    public http: HttpClient, 
    public alertController: AlertController,
    private activateRoute: ActivatedRoute, 
    private router: Router, 
    private modalCtrl: ModalController) {}

  async ngOnInit() {
    this.activateRoute.queryParams.subscribe((parametros: ILista) => {
      this.lista = parametros
    });

    this.itensListaApi = await this.listarItensApi.getItemListaPorListaId(this.lista.id);
  }

  async alterarItem(itemLista: IItemLista) {
    const alert = await this.alertController.create({
      header: itemLista.nome,
      inputs: [
        {
          name: 'name',
          type: 'number',
          value: itemLista.quantidade,
          min: 0,
        }
      ],
      buttons: [
        {
          text: 'Atualizar',
          handler: (data) => {
            this.atualizar(data, itemLista);
          }
        },
        {
          text: 'Excluir',
          handler: () => {
            this.excluir(itemLista);
          }
        }, 
        {
          text: 'Sair',
          handler: () => {
         
          }
        }
      ]
    });
    await alert.present();
  }

  atualizar(data: any, itemLista: IItemLista) {
    if(itemLista.id != 0) {
      this.itensListaApi.splice(this.itensListaApi.indexOf(itemLista), 1);
      itemLista.statusItemListaId = StatusItemLista.Atualizado;
      itemLista.quantidade = data.name;
      this.itensListaNovo.push(itemLista);
    } else {
      itemLista.quantidade = data.name; 
    }
     
    this.teveAlteracao = true;
  }

  excluir(itemLista: IItemLista) {
    if(itemLista.id != 0) {
      this.itensListaApi.splice(this.itensListaApi.indexOf(itemLista), 1);
      itemLista.statusItemListaId = StatusItemLista.Excluido;
      this.itensListaNovo.push(itemLista);
    } else
      this.itensListaNovo.splice(this.itensListaNovo.indexOf(itemLista), 1);

    this.teveAlteracao = true;
  }

  async salvarAlteracoes() {
    if(this.teveAlteracao) {
      const retorno = await this.listarItensApi.atualizarLista(this.itensListaNovo);
      if(retorno)
        this.cancelar();
      
    } else {
      alert("não teve alteração");
    }
  }

  cancelar() {
    this.router.navigateByUrl(ROUTES_COMPONENTS.HOME_SOLICITANTE)
               .then(nav => {window.location.reload();
    });
  }

  async adicionarItem() {
    const modal = await this.modalCtrl.create({
      component: ModalSolicitacaoComponent,
      componentProps: {
        listaId: this.lista.id,
        itensListaNovo: this.itensListaNovo
      }
    });
    modal.onDidDismiss().then(result =>{
      if(result.data.itemAdicionado) {
        this.teveAlteracao = true;
        const itensLista = result.data.itensListaNovo as IItemLista[];
        const idsItensListaApi = this.itensListaApi.map(x => x.itemId);
        
        const itensListaNovo = this.atualizarItensLista(idsItensListaApi, itensLista)        
        if(itensListaNovo){
          this.itensListaNovo = itensListaNovo;
        }
      }
    });
    return await modal.present();
  } 

  atualizarItensLista(idsItensListaApi: number[], itensListaNovo: IItemLista[]) {
    const itensAlterados = itensListaNovo.filter(x => idsItensListaApi.indexOf(x.itemId) !== -1);
    
    itensAlterados.forEach(itemLista => {
      const item = this.itensListaApi.find(x => x.itemId == itemLista.itemId);
      itemLista.quantidade = itemLista.quantidade + item.quantidade;
      itemLista.id = item.id;
      itemLista.statusItemListaId = StatusItemLista.Atualizado;
      this.itensListaApi.splice(this.itensListaApi.indexOf(item), 1);
    });

    return itensListaNovo;    
  } 
}
