import { NgModule } from "@angular/core";
import { AngularMaterialModule } from "../angular-material/angular.material.module";
import { PipesModule } from "../Pipes/pipes.module";
import { UsersListComponent } from './users-list/users-list.component';
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
    UsersListComponent
  ],
    imports: [
        CommonModule, // Importa o CommonModule para usar diretivas comuns do Angular, usar o *ngFor, *ngIf, etc no user-list.html .
        AngularMaterialModule, // Importa o módulo AngularMaterialModule para usar os componentes do Angular Material
        PipesModule
    ],
    exports: [
        UsersListComponent
    ],
})
export class ComponentsModule {}