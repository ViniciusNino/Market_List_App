import { Component, OnInit } from "@angular/core";
import { IUsuario } from "../shared/usuario/interfaces";
import { IUnidade, IUnidadeCadastro } from "../shared/Unidade/interface";
import { USUARIO } from "../shared/usuario/constants";
import { Router } from "@angular/router";
import { ROUTES_COMPONENTS } from "../app-const.route";
import { UnidadeApi } from "./unidade.api";
import { FormBuilder, FormGroup } from "@angular/forms";
import { getToast } from "../shared/toast/constants";
import { IToast } from "../shared/toast/interface";

@Component({
  selector: "app-unidade",
  templateUrl: "./unidade.page.html",
  styleUrls: ["./unidade.page.scss"],
})
export class UnidadePage implements OnInit {
  unidade: IUnidadeCadastro;
  selectedUnidadeId: number;
  unidades: IUnidade[] = [];
  usuarioLogado: IUsuario;
  loading: boolean = false;
  toast: IToast = getToast();
  showToast = false;
  
  constructor(
    private router: Router,
    private api: UnidadeApi
  ) {}
    
  async ngOnInit() {
    this.usuarioLogado = JSON.parse(localStorage.getItem(USUARIO.USUARIOAUTENTICAR));
    if (!this.unidade) {
      this.unidade = {nome: "", idUsuario: 0}
    }
    this.unidades = await this.api.getUnidades(this.usuarioLogado.id);
  }

  async cadastrar(unidade: IUnidade){
    if (this.unidade.nome === "") {
      this.displayToast(false, "Nome Unidade", "Escolha um nome para nova unidade.")
    } else {
      this.loading = true;
      this.unidade.idUsuario = this.usuarioLogado.id;
      const result = await this.api.setUnidade(this.unidade)
        .catch((error) => {
          const errorMessage = error.split(", ");
          this.displayToast(false, "Erro de cadastro", errorMessage[1]);
          this.loading = false;
          return null;
        });
      this.loading = false;
      if (result.statusResult === 200) {
        this.displayToast(true, "Unidade", "Unidade cadastrado com sucesso!");
      } 
    }
  }

  cancelar(){
    this.router.navigateByUrl(ROUTES_COMPONENTS.HOME_SOLICITANTE);
  }

  displayToast(sucess: boolean, title: string, notes: string) {
    this.toast = getToast(sucess, title, notes);
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3500);
  }
}
