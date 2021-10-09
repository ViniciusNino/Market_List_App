import { Injectable } from "@angular/core";
import { IItem } from "../shared/item/item.interfaces";
import { HttpProvider } from "../shared/providers/http.providers";
import { SOLICITACAO } from "./solicitacao.endpoint";

@Injectable({
    providedIn: 'root'
  })

export class SolicitacaoApi {
    constructor (readonly http: HttpProvider) {}

    async getItemPorUnidade(unidadeId: number): Promise<IItem[]> {
        const params = { "unidadeId": unidadeId}
       
        return this.http.get<IItem[]>(SOLICITACAO.GET_ITEM, params).toPromise();
    }

    async postItensParaComprar(parans: IItem[]): Promise<boolean> {

        return this.http.post<boolean>(SOLICITACAO.POST_ITENS_COMPRA, parans).toPromise();
    }
}