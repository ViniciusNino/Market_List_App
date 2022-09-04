export interface IItemLista {
    id: number, 
    nome: string,
    unidadeMedida: string,
    quantidade: number,
    usuarioLogadoId: number,
    itemId: number,
    listaId: number,
    statusItemListaId: number,
}

export interface IListaAtualizar {
    listaId: number, 
    usuarioLogadoId: number,
    ItensLista: IItemListaAtualizar[]
}

export interface IItemListaAtualizar {
    id: number, 
    quantidade: number,
    itemId: number,
}