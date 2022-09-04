import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { API } from "../../environments/environment";
import { ROUTES_COMPONENTS } from "../app-const.route";
import { HomeSolicitanteApi } from "../home-solicitante/home-solicitante.api";
import { USUARIO } from "../shared/usuario/constants";
import { TipoPerfilUsuario } from "../shared/usuario/enums";
import { IDadosAutenticacao, IUsuario } from "../shared/usuario/interfaces";
import { LoginApi } from "./login.api";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  API_URL = API;
  usuario: IUsuario;
  dadosAutenticacao: IDadosAutenticacao;

  constructor(
    private router: Router,
    readonly logimApi: LoginApi,
    readonly homeSolicitanteApi: HomeSolicitanteApi
  ) {}

  ngOnInit() {
    this.dadosAutenticacao = { Usuario: "", Senha: "" };
  }

  async login() {
    this.usuario = await this.logimApi
      .getUsuarioAutenticado(this.dadosAutenticacao)
      .catch((error) => {
        console.error(error);
        return null;
      });
    if (this.usuario && this.usuario.id > 0) {
      localStorage.setItem(
        USUARIO.USUARIOAUTENTICAR,
        JSON.stringify(this.usuario)
      );
      if (this.usuario.perfilId == TipoPerfilUsuario.Solicitante) {
        this.router.navigateByUrl(ROUTES_COMPONENTS.HOME_SOLICITANTE);
      } else {
        this.router.navigateByUrl(ROUTES_COMPONENTS.HOME);
      }
    } else {
      alert("Usuário ou Senha Inválido");
    }
  }
}
