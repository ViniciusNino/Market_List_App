export interface IItem {
    id: number;
    nome: string;
    unidadeMedida: string;
    quantidade: number;
    usuarioLogadoId: number;
    itemListaId?: number;
}