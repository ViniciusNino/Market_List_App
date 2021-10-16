import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { HttpClient } from '@angular/common/http'
import { AlertController, ModalController } from '@ionic/angular'
import { ModalSolicitacaoComponent } from './modal-solicitacao/modal-solicitacao.component'
import { IItemLista } from '../shared/itemLista/interfaces'
import { ILista } from '../shared/Lista/interfaces'
import { ListarItensApi } from './listar-itens.api'

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
    private modalCtrl: ModalController) { 
  }

  async ngOnInit() {
    this.activateRoute.queryParams.subscribe((parametros: ILista) => {
      this.lista = parametros
    });

    this.itensListaApi = await this.listarItensApi.getItemListaPorListaId(this.lista.nIdLista);
  }

  async alterarItem(itemLista: IItemLista) {
    const alert = await this.alertController.create({
      header: itemLista.sNome,
      inputs: [
        {
          name: 'name',
          type: 'number',
          value: itemLista.nQuantidade,
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
    if(itemLista.nIdItem != 0) {
      itemLista.nQuantidade = data.name;
    } else {
      itemLista.nQuantidade = data.name; 
    }
     
    this.teveAlteracao = true;
  }

  excluir(itemLista: IItemLista) {
    if(itemLista.nIdItem != 0) {
      this.itensListaApi.splice(this.itensListaApi.indexOf(itemLista), 1);
    } else
      this.itensListaNovo.splice(this.itensListaNovo.indexOf(itemLista), 1);

    this.teveAlteracao = true;
  }

  public salvarAlteracoes() {
    if(this.teveAlteracao){
      if(this.itensListaNovo != null){
        this.itensListaNovo.forEach(item => {
          this.itensListaApi.push(item);
        });
      }
      this.http.post(this.API_URL+ "itemLista/PostAlualizarItens?id="+this.lista.nIdLista, this.itensListaApi).subscribe((response) => {
        if(response)
          this.cancelar();
      });
    }else{
      alert("não teve alteração");
    }
  }

  public cancelar() {
    this.itensListaNovo = null;
    this.itensListaApi = null;
    this.router.navigateByUrl("home-solicitante");
  }

  async adicionarItem() {
    const modal = await this.modalCtrl.create({
      component: ModalSolicitacaoComponent
    });
    modal.onDidDismiss().then((vmItensModal) =>{

      vmItensModal.data.forEach(element => {
        let existe = false;
        for(let p = 0; p < this.itensListaApi.length; p++) {
          if(element['sNome'] == this.itensListaApi[p]['sNome']){
            this.itensListaApi[p]['nQuantidade'] = element['nQuantidade'] + this.itensListaApi[p]['nQuantidade'];
            console.log(element['nQuantidade'] +" lItensLista "+ this.itensListaApi[p]['nQuantidade'])
            p = this.itensListaApi.length;
            existe = true;
          }
        }
        if(existe)
        vmItensModal.data.splice(element);
      });
      if(vmItensModal.data.length != 0){
        if(this.itensListaNovo == null){
          this.itensListaNovo = vmItensModal.data;
          this.teveAlteracao = true;
        }
        else{
          vmItensModal.data.forEach(element => {
            let existe = false;
            for(let i = 0; i < this.itensListaNovo.length; i++) {
              if(element['nIdItem'] == this.itensListaNovo[i]['nIdItem']){
                this.itensListaNovo[i]['nQuantidade'] = element['nQuantidade'] + this.itensListaNovo[i]['nQuantidade'];
                i = this.itensListaNovo.length;
                existe = true;
              }
            }
            if(!existe)
              this.itensListaNovo.push(element);
          });
          this.teveAlteracao = true;
        }
      }
    });
    return await modal.present();
  } 

  public testar(){
    console.log(this.itensListaNovo);
  }
}
