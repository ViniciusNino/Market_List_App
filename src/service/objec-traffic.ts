import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

import { ILista } from "../app/shared/Lista/interfaces";

@Injectable()
export class ObjectTrafic {
  private deletarLista = new Subject<ILista>();

  public deletarLista$: Observable<ILista>;

  constructor() {
    this.deletarLista$ = this.deletarLista.asObservable();
  }

  onDeletarLista(param: ILista) {
    this.deletarLista.next(param);
  }
}
