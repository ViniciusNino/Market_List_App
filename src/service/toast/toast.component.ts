import { Component, Input, OnInit } from "@angular/core";
import { getToast } from "src/app/shared/toast/constants";
import { IToast } from "src/app/shared/toast/interface";

@Component({
  selector: "app-toast",
  templateUrl: "./toast.component.html",
  styleUrls: ["./toast.component.scss"],
})
export class ToastComponent implements OnInit {
  @Input() toast: IToast = getToast();
  @Input() show: boolean;

  constructor() {}

  ngOnInit() {}

  onCloseToast() {
    this.show = false;
  }
}
