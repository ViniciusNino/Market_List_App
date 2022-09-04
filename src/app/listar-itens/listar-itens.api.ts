import { IListaAtualizar } from './../shared/itemLista/interfaces';
import { Injectable } from "@angular/core";
import { IItemLista } from "../shared/itemLista/interfaces";
import { HttpProvider } from "../shared/providers/http.providers";
import { LISTAR_ITENS } from "./listar-itens.endpoints";

@Injectable({
    providedIn: 'root'
})

export class ListarItensApi {
    constructor (readonly http: HttpProvider) {}

    async getItemListaPorListaId(listaId: number): Promise<IItemLista[]> {
        const params = { nIdLista: listaId }

        return this.http.get<IItemLista[]>(LISTAR_ITENS.GET_ITENSLISTA_POR_LISTAID, params).toPromise();
    }


    async atualizarLista(itensLista: IListaAtualizar): Promise<boolean> {

        return this.http.post<boolean>(LISTAR_ITENS.ATUALIZAR_LISTA, itensLista).toPromise();
    }
}