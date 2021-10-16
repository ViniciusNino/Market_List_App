import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { USUARIO } from '../../shared/usuario/constants';

@Component({
  selector: 'app-modal-solicitacao',
  templateUrl: './modal-solicitacao.component.html',
  styleUrls: ['./modal-solicitacao.component.scss'],
})
export class ModalSolicitacaoComponent implements OnInit {
  private API_URL = 'http://localhost:5000/'
 itens: any;

  constructor(private modalCtrl: ModalController,public http: HttpClient) { }

  ngOnInit() {
    this.http.get(this.API_URL+"item/get").subscribe((response) => {
      this.itens = response;
    });

  }
  
  public adicionar(){
    
    let vmItens = [];
    let usuarioAutenticado = JSON.parse(localStorage.getItem(USUARIO.USUARIOAUTENTICAR));
    
    this.itens.forEach(element => {
      if(element.nQuantidade != 0){
        element.nIdUsuarioLogado = usuarioAutenticado['nIdUsuarioAutenticado'];
        vmItens.push(element);
      }
    });
    if(vmItens.length > 0){
      this.modalCtrl.dismiss(vmItens);
    }else{
      alert('Selecione no mínimo 1 item para adicionar.')
    }
  }

  async cancelar() {
    await this.modalCtrl.dismiss();
  }
}
