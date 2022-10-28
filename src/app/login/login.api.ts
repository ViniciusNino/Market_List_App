import { Injectable } from "@angular/core";
import { HttpProvider } from "../shared/providers/http.providers";
import { ILogin } from "../shared/usuario/interfaces";
import {
  ICadastroUsuario,
  IValidacaoEmail,
} from "./../shared/usuario/interfaces";
import { Login } from "./login.endpoints";

@Injectable({
  providedIn: "root",
})
export class LoginApi {
  constructor(readonly http: HttpProvider) {}

  async getUsuarioAutenticado(login: ILogin): Promise<any> {
    return this.http.post<any>(Login.AUTENTICAR, login).toPromise();
  }

  async setRegistrarUsuario(cadastro: ICadastroUsuario): Promise<any> {
    return this.http.post<any>(Login.REGISTRAR, cadastro).toPromise();
  }

  async reenviarValidacaoEmail(email: IValidacaoEmail): Promise<any> {
    return this.http
      .post<any>(Login.REENVIAR_VALIDACAO_EMAIL, email)
      .toPromise();
  }

  async solicitarSenhaTemporaria(email: string): Promise<any> {
    const validacaoEmail = { email: email };

    return this.http
      .post<any>(Login.ENVIAR_EMAIL_SENHA, validacaoEmail)
      .toPromise();
  }
}
