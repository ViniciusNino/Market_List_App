import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { API} from '../../environments/environment';
import { LoginApi } from './login.api';
import { IDadosAutenticacao, IUsuario } from '../shared/usuario/interfaces';
import { TipoPerfilUsuario } from '../shared/usuario/enums';
import { USUARIO } from '../shared/usuario/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  API_URL = API;
  usuario: IUsuario;
  dadosAutenticacao: IDadosAutenticacao;
  
  constructor(
    private router :Router,
    readonly logimApi: LoginApi,
    ) { }

  ngOnInit() { 
    this.dadosAutenticacao = {Usuario: "", Senha: ""}
  }

  async login() {
    this.usuario = await this.logimApi
      .getUsuarioAutenticado(this.dadosAutenticacao)
      .catch(error => {
        console.error(error);
        return null;
      })
    if (this.usuario.id > 0) {
      localStorage.setItem(USUARIO.USUARIOAUTENTICAR, JSON.stringify(this.usuario));
      if(this.usuario.perfilId == TipoPerfilUsuario.Solicitante ) {
        this.router.navigateByUrl("home-solicitante");
      } else {
        this.router.navigateByUrl("home"); 
      }
    } else {
      alert("Usuário ou Senha Inválido")
    }
  }  
}
