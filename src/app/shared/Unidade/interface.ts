import { ILista } from "./../Lista/interfaces";
export interface IUnidade {
  id: number;
  nome: string;
  exibirLista: boolean;
  listas: ILista[];
}

export interface IUnidadeCadastro {
  idUsuario: number;
  nome: string;
}