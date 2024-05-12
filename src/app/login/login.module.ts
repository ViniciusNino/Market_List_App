import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

import { LoaderModule } from "src/service/loader/loader.module";
import { ToastModule } from "src/service/toast/toast.module";
import { LoginPageRoutingModule } from "./login-routing.module";
import { LoginPage } from "./login.page";
import { SenhaTempComponent } from "./senha-temp/senha-temp.component";
import { SignInComponent } from "./sign-in/sign-in.component";
import { SignUpComponent } from "./sign-up/sign-up.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    LoginPageRoutingModule,
    LoaderModule,
    ToastModule,
  ],
  entryComponents: [SenhaTempComponent],
  declarations: [
    LoginPage,
    SignInComponent,
    SignUpComponent,
    SenhaTempComponent,
  ],
})
export class LoginPageModule {}
