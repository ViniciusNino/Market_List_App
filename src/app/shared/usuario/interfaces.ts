export interface IUsuario {
    id: number;
    nome: string;
    perfilId: number;
    unidadeId?: number
    nomeUnidade: string;
}

export interface IDadosAutenticacao {
    Usuario: string;
    Senha: string;
}