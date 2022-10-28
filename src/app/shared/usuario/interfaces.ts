export interface IUsuario {
  id: number;
  nome: string;
  perfilId: number;
  unidadeId?: number;
  nomeUnidade: string;
}

export interface ILogin {
  Email: string;
  Senha: string;
}

export interface ICadastroUsuario {
  Email: string;
  Senha: string;
  Nome: string;
}

export interface IValidacaoEmail {
  Email: string;
}
