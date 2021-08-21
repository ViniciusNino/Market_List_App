import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router';

@Component({
  selector: 'app-solicitacao',
  templateUrl: './solicitacao.page.html',
  styleUrls: ['./solicitacao.page.scss'],
})
export class SolicitacaoPage implements OnInit {
  private API_URL = 'http://localhost:5000/'
  public itens: any
  constructor(public http: HttpClient, private router: Router) {
    this.listar_itens()
  }

  ngOnInit() {
  }

  public listar_itens()
  {
    this.http.get(this.API_URL+"item/get").subscribe((response) => {
      this.itens = response
    });
  }

  public confirmar()
  {
    let vmItem = []
    let usuarioAutenticado = JSON.parse(localStorage.getItem('userData'));

    this.itens.forEach(element => {
      if(element.nQuantidade != 0){
        element.nIdUsuarioLogado = usuarioAutenticado["nIdUsuarioAutenticado"];
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
