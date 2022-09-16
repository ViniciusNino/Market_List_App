import { Injectable } from "@angular/core";
import { formatUrl } from "src/utils/string.utils";
import { HttpProvider } from "../shared/providers/http.providers";
import { IUnidade } from "../shared/Unidade/interface";
import { HOME } from "./home.endpoints";

@Injectable({
  providedIn: "root",
})
export class HomeApi {
  constructor(readonly http: HttpProvider) {}

  async getUnidadeDoUsuario(unidadeId: number): Promise<IUnidade[]> {
    const url = formatUrl(HOME.GET_UNIDADES, [unidadeId]);

    return this.http.get<IUnidade[]>(url).toPromise();
  }
}
