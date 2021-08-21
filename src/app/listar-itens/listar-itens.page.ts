import { Component, OnInit, Input } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { HttpClient } from '@angular/common/http'
import { AlertController, ModalController } from '@ionic/angular'
import { proxyInputs } from '@ionic/angular/directives/proxies-utils'
import { ModalSolicitacaoComponent } from '../modal-solicitacao/modal-solicitacao.component'
import { element } from 'protractor'

@Component({
  selector: 'app-listar-itens',
  templateUrl: './listar-itens.page.html',
  styleUrls: ['./listar-itens.page.scss'],
})
export class ListarItensPage implements OnInit {
  private API_URL = 'http://localhost:5000/'
  lista: any;
  vmItens:any;
  lItensLista: any;
  teveAlteracao: any = false;

  constructor(private activateRoute: ActivatedRoute, public alertController: AlertController,
    private router: Router, public http: HttpClient, private modalCtrl: ModalController) { 
  }

  ngOnInit() {
    this.activateRoute.queryParams.subscribe(parametros => {
      this.lista = parametros
    });
    
    this.http.get(this.API_URL+ "itemLista/GetItemLista?id="+ this.lista["id"]).subscribe((response) =>{
      this.lItensLista = response;
    });
  }

  async alterarItem(itemLista, index, quantidade) {
    const alert = await this.alertController.create({
      header: itemLista['sNome'],
      inputs: [
        {
          name: 'name',
          type: 'number',
          value: quantidade,
          min: 0,
        }
      ],
      buttons: [
        {
          text: 'Atualizar',
          handler: (data) => {
            if(data.name == 0)
              this.lItensLista.splice(index, 1);
            else if(itemLista['nIdItem'] == 0)
              this.lItensLista[index].nQuantidade = data.name;
            else
              this.vmItens[index].nQuantidade = data.name; 
            
            this.teveAlteracao = true;
          }
        },
        {
          text: 'Excluir',
          handler: () => {
            if(itemLista['nIdItem'] == 0)
              this.lItensLista.splice(index, 1);
            else
              this.vmItens.splice(index, 1);
            this.teveAlteracao = true;
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

  public salvarAlteracoes() {
    if(this.teveAlteracao){
      if(this.vmItens != null){
        this.vmItens.forEach(item => {
          this.lItensLista.push(item);
        });
      }
      this.http.post(this.API_URL+ "itemLista/PostAlualizarItens?id="+this.lista.id, this.lItensLista).subscribe((response) => {
        if(response)
          this.cancelar();
      });
    }else{
      alert("não teve alteração");
    }
  }

  public cancelar() {
    this.vmItens = null;
    this.lItensLista = null;
    this.router.navigateByUrl("home-solicitante");
  }

  async adicionarItem() {
    const modal = await this.modalCtrl.create({
      component: ModalSolicitacaoComponent
    });
    modal.onDidDismiss().then((vmItensModal) =>{

      vmItensModal.data.forEach(element => {
        let existe = false;
        for(let p = 0; p < this.lItensLista.length; p++) {
          if(element['sNome'] == this.lItensLista[p]['sNome']){
            this.lItensLista[p]['nQuantidade'] = element['nQuantidade'] + this.lItensLista[p]['nQuantidade'];
            console.log(element['nQuantidade'] +" lItensLista "+ this.lItensLista[p]['nQuantidade'])
            p = this.lItensLista.length;
            existe = true;
          }
        }
        if(existe)
        vmItensModal.data.splice(element);
      });
      if(vmItensModal.data.length != 0){
        if(this.vmItens == null){
          this.vmItens = vmItensModal.data;
          this.teveAlteracao = true;
        }
        else{
          vmItensModal.data.forEach(element => {
            let existe = false;
            for(let i = 0; i < this.vmItens.length; i++) {
              if(element['nIdItem'] == this.vmItens[i]['nIdItem']){
                this.vmItens[i]['nQuantidade'] = element['nQuantidade'] + this.vmItens[i]['nQuantidade'];
                i = this.vmItens.length;
                existe = true;
              }
            }
            if(!existe)
              this.vmItens.push(element);
          });
          this.teveAlteracao = true;
        }
      }
    });
    return await modal.present();
  }

  public testar(){
    console.log(this.vmItens);
  }
}
