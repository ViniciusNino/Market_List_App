import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ControlContainer } from '@angular/forms';

@Component({
  selector: 'app-home-solicitante',
  templateUrl: './home-solicitante.page.html',
  styleUrls: ['./home-solicitante.page.scss'],
})
export class HomeSolicitantePage implements OnInit {
  private API_URL = 'http://localhost:5000/'
  public unidade: any;
  public listas: any;

  constructor(private router: Router, public http: HttpClient) { 
  }

  ngOnInit() {
    let usuarioAutenticado = JSON.parse(localStorage.getItem('userData'));
    this.unidade = usuarioAutenticado.sNomeUnidade;

    this.http.get(this.API_URL+"lista/GetPorUnidade?id="+ usuarioAutenticado.nIdUnidade).subscribe((response) => {
      this.listas = response;
    });
  }
  
  public cadastrarNovaLista(){
    this.router.navigateByUrl("solicitacao");
  }

  public selecionarLista(lista){
    this.router.navigate(['listar-itens'], {queryParams: {id: lista["nIdLista"], data: lista["dCadastro"], nome: lista["sNome"]}});
  }
}
