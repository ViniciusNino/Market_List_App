import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import {
  AlertController,
  LoadingController,
  ModalController,
  NavController,
  ToastController,
} from "@ionic/angular";
import { ROUTES_COMPONENTS } from "src/app/app-const.route";
import { getToast } from "src/app/shared/toast/constants";
import { IToast } from "src/app/shared/toast/interface";
import { USUARIO } from "src/app/shared/usuario/constants";
import { TipoPerfilUsuario } from "src/app/shared/usuario/enums";
import { ILogin, IUsuario } from "src/app/shared/usuario/interfaces";
import { LoginApi } from "../login.api";
import { SenhaTempComponent } from "../senha-temp/senha-temp.component";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"],
})
export class SignInComponent implements OnInit {
  public usuario: IUsuario;
  public onLoginForm: FormGroup;
  public dadosAutenticacao: ILogin;
  loading: boolean = false;
  toast: IToast = getToast();
  showToast = false;

  constructor(
    private router: Router,
    readonly loginApi: LoginApi,
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    readonly modalController: ModalController
  ) {}

  ngOnInit() {
    this.dadosAutenticacao = { Email: "", Senha: "" };
    this.createFormLogin();
  }

  createFormLogin() {
    this.onLoginForm = this.formBuilder.group({
      email: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
        ]),
      ],
      password: [null, Validators.compose([Validators.required])],
    });
  }

  async forgotPass() {
    const alert = await this.alertCtrl.create({
      header: "Solicitar senha temporária?",
      message: "Entre com seu email para enviarmos sua senha temporária.",
      inputs: [
        {
          name: "email",
          type: "email",
          placeholder: "Email",
        },
      ],
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Confirm Cancel");
          },
        },
        {
          text: "Enviar",
          handler: async (input) => {
            await this.solicitarSenhaTemporaria(input.name);
          },
        },
      ],
    });

    await alert.present();
  }

  goToRegister() {
    this.navCtrl.navigateRoot(ROUTES_COMPONENTS.SIGN_UP);
  }

  goToHome() {
    this.navCtrl.navigateRoot("/home-results");
  }

  async login() {
    this.usuario = await this.loginApi
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

  async abrirModal() {
    const modal = await this.modalController.create({
      component: SenhaTempComponent,
      componentProps: {},
      backdropDismiss: false,
      cssClass: "ms-modal",
    });
    await modal.present();
    modal.onDidDismiss().then((result) => {
      if (result.data?.email) {
      }
    });
  }

  async solicitarSenhaTemporaria(email: string) {
    this.loading = true;
    const result = await this.loginApi
      .solicitarSenhaTemporaria(email)
      .catch((error) => {
        const errorMessage = error.split(", ");
        this.displayToast(false, "Erro ao solicitar senha", errorMessage[1]);
        this.loading = false;
        return null;
      });
    if (result.response) {
      this.displayToast(
        true,
        "Solicitação de senha!",
        "Senha solicitada com sucesso, Verifique sua caixa de email para obter sua senha temporária."
      );
      this.loading = false;
    }
  }

  displayToast(sucess: boolean, title: string, notes: string) {
    this.toast = getToast(sucess, title, notes);
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3500);
  }
}
