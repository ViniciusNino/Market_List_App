import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MenuController, NavController } from "@ionic/angular";
import { ROUTES_COMPONENTS } from "src/app/app-const.route";
import { getToast } from "src/app/shared/toast/constants";
import { IToast } from "src/app/shared/toast/interface";
import { ICadastroUsuario } from "src/app/shared/usuario/interfaces";
import { LoginApi } from "./../login.api";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"],
})
export class SignUpComponent implements OnInit {
  public onRegisterForm: FormGroup;
  loading: boolean = false;
  toast: IToast = getToast();
  showToast = false;

  get nome() {
    return this.onRegisterForm.get("fullName").value;
  }

  get email() {
    return this.onRegisterForm.get("email").value;
  }

  get senha() {
    return this.onRegisterForm.get("password").value;
  }

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    private formBuilder: FormBuilder,
    private readonly loginApi: LoginApi
  ) {}

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.onRegisterForm = this.formBuilder.group({
      fullName: [null, Validators.compose([Validators.required])],
      email: [
        null,
        Validators.compose([
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
          Validators.required,
        ]),
      ],
      password: [null, Validators.compose([Validators.required])],
    });
  }

  async signUp() {
    this.loading = true;
    const result = await this.loginApi
      .setRegistrarUsuario(this.criarUsuarioCadastro())
      .catch((error) => {
        const errorMessage = error.split(", ");
        this.displayToast(false, "Erro ao criar usuário", errorMessage[1]);
        this.loading = false;
        return null;
      });
    if (result.response) {
      this.displayToast(
        true,
        "Criar usuário!",
        "Usuário criado com sucesso, Verifique sua caixa de email e ative sua conta."
      );
      this.loading = false;
      this.goToLogin();
    }
  }

  criarUsuarioCadastro(): ICadastroUsuario {
    return {
      Nome: this.nome,
      Email: this.email,
      Senha: this.senha,
    };
  }

  displayToast(sucess: boolean, title: string, notes: string) {
    this.toast = getToast(sucess, title, notes);
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3500);
  }

  goToLogin() {
    this.navCtrl.navigateRoot(ROUTES_COMPONENTS.SIGN_IN);
  }
}
