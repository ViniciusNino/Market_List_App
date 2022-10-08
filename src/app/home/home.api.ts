import { Injectable } from "@angular/core";
import { formatUrl } from "src/utils/string.utils";
import { HttpProvider } from "../shared/providers/http.providers";
import { IUnidade } from "../shared/Unidade/interface";
import { IAgrupadorListas } from "./../shared/Lista/interfaces";
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

  async setAgrupadoListas(agrupadorListas: IAgrupadorListas): Promise<any> {
    return this.http
      .post(HOME.POST_AGRUPAR_LISTAS, agrupadorListas)
      .toPromise();
  }
}
