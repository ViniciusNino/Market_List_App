import { IItemLista } from "../itemLista/interfaces";

export interface ILista {
  id: number;
  usuarioId: number;
  nome: string;
  nomeUsuario: string;
  cadastro: Date;
  selecionado: boolean;
  itensLista: IItemLista[];
}

export interface IAgrupadorListas {
  usuarioId: number;
  listaIds: number[];
  status?: number;
  descricao: string;
}
