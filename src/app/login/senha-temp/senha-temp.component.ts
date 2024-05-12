import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-senha-temp",
  templateUrl: "./senha-temp.component.html",
  styleUrls: ["./senha-temp.component.scss"],
})
export class SenhaTempComponent implements OnInit {
  public onSenhaForm: FormGroup;

  get email() {
    return this.onSenhaForm.get("email").value;
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly modalController: ModalController
  ) {}

  ngOnInit() {
    this.createFormLogin();
  }

  createFormLogin() {
    this.onSenhaForm = this.formBuilder.group({
      email: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
        ]),
      ],
    });
  }

  onClose(email: string = null) {
    this.modalController.dismiss({
      // email: email,
    });
  }
}
