import { Injectable } from "@angular/core";
import { HttpProvider } from "../shared/providers/http.providers";
import { IDadosAutenticacao, IUsuario } from "../shared/usuario/interfaces";
import { Login } from "./login.endpoints";

@Injectable({
    providedIn: 'root'
  })

export class LoginApi {
    constructor(readonly http: HttpProvider) {}

    async getUsuarioAutenticado(dadosAutenticacao: IDadosAutenticacao): Promise<IUsuario> {

        return this.http.get<IUsuario>(Login.AUTENTICAR, dadosAutenticacao).toPromise();
    }
}