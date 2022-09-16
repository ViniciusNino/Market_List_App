import { Component, OnInit } from "@angular/core";
import { USUARIO } from "../shared/usuario/constants";
import { IUsuario } from "../shared/usuario/interfaces";
import { ILista } from "./../shared/Lista/interfaces";
import { IUnidade } from "./../shared/Unidade/interface";
import { HomeApi } from "./home.api";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  usuario: IUsuario;
  unidades: IUnidade[];

  constructor(private readonly homeApi: HomeApi) {}

  async ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem(USUARIO.USUARIOAUTENTICAR));
    this.unidades = await this.getUnidadesEListas(this.usuario.id);
  }

  async getUnidadesEListas(usuarioId: number) {
    const response = await this.homeApi
      .getUnidadeDoUsuario(usuarioId)
      .catch((error) => {
        const errorMessage = error.split(", ");
        return null;
      });
    if (response) {
      return response;
    }
  }

  onExibirLista(unidade: IUnidade) {
    unidade.exibirLista = !unidade.exibirLista;
  }

  onSelecionarLista(lista: ILista) {
    lista.selecionado = !lista.selecionado;
  }

  onJuntarListas() {}
}
