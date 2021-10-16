import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { ListarItensPageRoutingModule } from "./listar-itens-routing.module";
import { ListarItensPage } from "./listar-itens.page";

@NgModule ({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ListarItensPageRoutingModule
    ],
    declarations: [ListarItensPage]
})

export class ListarItensPageModule {}