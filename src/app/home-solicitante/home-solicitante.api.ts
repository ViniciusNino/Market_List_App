import { Injectable } from "@angular/core";
import { promise } from "selenium-webdriver";
import { ILista } from "../shared/Lista/interfaces";
import { HttpProvider } from "../shared/providers/http.providers";
import { Home_Solicitante } from "./home-solicitante.endpoints";

@Injectable ({
    providedIn: 'root'
})

export class HomeSolicitanteApi {
    constructor (readonly http: HttpProvider) {}

    async getListPorUnidade(unidadeId: number): Promise<ILista[]> {
        const params = { "unidadeId": unidadeId}

        return this.http.get<ILista[]>(Home_Solicitante.GET_LISTA, params).toPromise();
    }
}