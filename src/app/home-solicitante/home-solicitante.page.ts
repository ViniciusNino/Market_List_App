import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ObjectTrafic } from "../../service/objec-traffic";
import { ROUTES_COMPONENTS } from "../app-const.route";
import { ILista } from "../shared/Lista/interfaces";
import { USUARIO } from "../shared/usuario/constants";
import { IUsuario } from "../shared/usuario/interfaces";
import { HomeSolicitanteApi } from "./home-solicitante.api";

@Component({
  selector: "app-home-solicitante",
  templateUrl: "./home-solicitante.page.html",
  styleUrls: ["./home-solicitante.page.scss"],
})
export class HomeSolicitantePage implements OnInit {
  public usuario: IUsuario;
  public listas: ILista[];

  constructor(
    private readonly router: Router,
    private readonly objectTrafic: ObjectTrafic,
    private readonly homeSolicitanteApi: HomeSolicitanteApi
  ) {}

  async ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem(USUARIO.USUARIOAUTENTICAR));
    this.listas = await this.homeSolicitanteApi.getListPorUnidade(
      this.usuario.unidadeId
    );

    this.objectTrafic.deletarLista$.subscribe((lista) => {
      this.deleteLista(lista.id);
    });
  }

  deleteLista(lista_id: number) {
    const index = this.listas.indexOf(
      this.listas.find((lista) => lista.id == lista_id)
    );
    this.listas.splice(index, 1);
  }

  public cadastrarNovaLista() {
    this.router.navigateByUrl(ROUTES_COMPONENTS.SOLICITACAO);
  }

  public selecionarLista(lista) {
    this.router.navigate([ROUTES_COMPONENTS.LISTAR_ITENS], {
      queryParams: lista,
    });
  }

  checkLista() {}
}
