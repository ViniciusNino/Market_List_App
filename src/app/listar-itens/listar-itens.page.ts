import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertController, ModalController } from "@ionic/angular";
import { ObjectTrafic } from "../../service/objec-traffic";
import { ROUTES_COMPONENTS } from "../app-const.route";
import { StatusItemLista } from "../shared/itemLista/enum";
import { IItemLista } from "../shared/itemLista/interfaces";
import { ILista } from "../shared/Lista/interfaces";
import { USUARIO } from "../shared/usuario/constants";
import { IUsuario } from "../shared/usuario/interfaces";
import {
  IItemListaAtualizar,
  IListaAtualizar,
} from "./../shared/itemLista/interfaces";
import { ListarItensApi } from "./listar-itens.api";
import { ModalSolicitacaoComponent } from "./modal-solicitacao/modal-solicitacao.component";

@Component({
  selector: "app-listar-itens",
  templateUrl: "./listar-itens.page.html",
  styleUrls: ["./listar-itens.page.scss"],
})
export class ListarItensPage implements OnInit {
  usuario: IUsuario;
  lista: ILista;
  itensListaNovo: IItemLista[] = [];
  itensListaApi: IItemLista[];
  teveAlteracao: boolean = false;

  constructor(
    private readonly listarItensApi: ListarItensApi,
    public readonly alertController: AlertController,
    private readonly activateRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly objectTrafic: ObjectTrafic,
    private readonly modalCtrl: ModalController
  ) {}

  async ngOnInit() {
    this.activateRoute.queryParams.subscribe((parametros: ILista) => {
      this.lista = parametros;
    });

    this.usuario = JSON.parse(localStorage.getItem(USUARIO.USUARIOAUTENTICAR));
    this.itensListaApi = await this.listarItensApi.getItemListaPorListaId(
      this.lista.id
    );
    this.duplicarLista();
  }

  duplicarLista() {
    this.itensListaApi.forEach((item) => {
      this.itensListaNovo.push({ ...item });
    });
  }

  async alterarItem(itemLista: IItemLista) {
    const alert = await this.alertController.create({
      header: itemLista.nome,
      inputs: [
        {
          name: "name",
          type: "number",
          value: itemLista.quantidade,
          min: 0,
        },
      ],
      buttons: [
        {
          text: "Atualizar",
          handler: (data) => {
            this.atualizar(data, itemLista);
          },
        },
        {
          text: "Excluir",
          handler: () => {
            this.excluir(itemLista);
          },
        },
        {
          text: "Sair",
          handler: () => {},
        },
      ],
    });
    await alert.present();
  }

  atualizar(data: any, itemLista: IItemLista) {
    itemLista.statusItemListaId = StatusItemLista.Atualizado;
    itemLista.quantidade = parseInt(data.name);

    this.teveAlteracao = true;
  }

  excluir(itemLista: IItemLista) {
    this.itensListaNovo.splice(this.itensListaNovo.indexOf(itemLista), 1);
    this.teveAlteracao = true;
  }

  async salvarAlteracoes() {
    if (this.teveAlteracao) {
      const itensListaAtualizar = this.criarItensListaAtualizar();
      const retorno = await this.listarItensApi.atualizarLista(
        itensListaAtualizar
      );
      if (retorno) this.cancelar();
    } else {
      alert("não teve alteração");
    }
  }

  criarItensListaAtualizar(): IListaAtualizar {
    const listaAtualizar = {
      listaId: this.itensListaApi[0].listaId,
      usuarioLogadoId: this.usuario.id,
      ItensLista: [],
    } as IListaAtualizar;

    this.itensListaApi.forEach((item) => {
      const itemNovo = this.itensListaNovo.find((x) => x.itemId == item.itemId);
      if (!itemNovo) {
        const itemExcluir = { id: item.id } as IItemListaAtualizar;

        listaAtualizar.ItensLista.push(itemExcluir);
      }
    });

    this.itensListaNovo.forEach((item) => {
      const itemAntigo = this.itensListaApi.find(
        (x) => x.itemId == item.itemId
      );
      const itemNovo = { quantidade: item.quantidade } as IItemListaAtualizar;

      if (!itemAntigo) {
        itemNovo.itemId = item.itemId;
        listaAtualizar.ItensLista.push(itemNovo);
      } else if (itemAntigo.quantidade !== item.quantidade) {
        itemNovo.id = item.id;
        listaAtualizar.ItensLista.push(itemNovo);
      }
    });

    return listaAtualizar;
  }

  cancelar() {
    this.router.navigateByUrl(ROUTES_COMPONENTS.HOME_SOLICITANTE);
  }

  async adicionarItem() {
    const modal = await this.modalCtrl.create({
      component: ModalSolicitacaoComponent,
      componentProps: {
        listaId: this.lista.id,
        itensListaNovo: this.itensListaNovo,
      },
    });
    modal.onDidDismiss().then((result) => {
      if (result.data.itemAdicionado) {
        this.teveAlteracao = true;
        const itensLista = result.data.itensListaNovo as IItemLista[];
        this.atualizarItensLista(itensLista);
      }
    });
    return await modal.present();
  }

  atualizarItensLista(itensListaNovo: IItemLista[]) {
    itensListaNovo.forEach((itemLista) => {
      const item = this.itensListaNovo.find(
        (x) => x.itemId == itemLista.itemId
      );
      if (item) {
        item.quantidade = itemLista.quantidade;
      } else {
        this.itensListaNovo.push(itemLista);
      }
    });
  }

  async excluirLista() {
    const deletarLista = await this.listarItensApi
      .deletarLista(this.lista.id)
      .catch((error) => {
        return null;
      });

    this.objectTrafic.onDeletarLista(this.lista);
    this.cancelar();
  }
}
