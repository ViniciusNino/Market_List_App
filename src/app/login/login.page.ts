import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userData = { "sUsuario": "", "sSenha": "" };
  private API_URL = 'http://localhost:5000/'
  constructor(private router :Router,private http: HttpClient) {
    
   }

  ngOnInit() {
  }
  public login(form)
  {
    this.http.post(this.API_URL+"usuario/autenticar",this.userData).subscribe((response) => {
      if (response ["nIdUsuarioAutenticado"] > 0) {
             localStorage.setItem('userData', JSON.stringify(response));
             if(response["nIdPerfilUsuario"] == 4 ){
              this.router.navigateByUrl("home-solicitante");
             }
             else{
                this.router.navigateByUrl("home"); 

             }
           } else {
             alert("Usuário ou Senha Inválido")
          }
    });               
  }
}
