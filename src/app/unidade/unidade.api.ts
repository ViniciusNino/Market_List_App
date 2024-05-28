import { Injectable } from "@angular/core";
import { ILista } from "../shared/Lista/interfaces";
import { HttpProvider } from "../shared/providers/http.providers";
import { IUnidade, IUnidadeCadastro } from "../shared/Unidade/interface";
import { ENDPOINTS_UNIDADE } from "./unidade.const";
import { formatUrl } from "src/utils/string.utils";

@Injectable({
    providedIn: 'root'
  })

export class UnidadeApi {
    constructor (
        private readonly http: HttpProvider
    ) {}

    async getUnidades(usuarioId: number): Promise<IUnidade[]> {
        
        const url = formatUrl(ENDPOINTS_UNIDADE.GET_UNIDADES, [usuarioId]);
       
        return this.http.get<IUnidade[]>(url).toPromise();
    }

    async setUnidade(parans: IUnidadeCadastro): Promise<any> {

        return this.http.post<boolean>(ENDPOINTS_UNIDADE.SET_UNINADE, parans).toPromise();
    }
}