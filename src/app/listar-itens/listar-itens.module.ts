import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { ListarItensPageRoutingModule } from "./listar-itens-routing.module";
import { ListarItensPage } from "./listar-itens.page";
import { ModalSolicitacaoComponent } from "./modal-solicitacao/modal-solicitacao.component";

@NgModule ({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ListarItensPageRoutingModule
    ],
    declarations: [
        ListarItensPage,
        ModalSolicitacaoComponent
    ],
    entryComponents: [ModalSolicitacaoComponent]
})

export class ListarItensPageModule {}