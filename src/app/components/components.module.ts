import { NgModule } from "@angular/core";
import { AngularMaterialModule } from "../angular-material/angular.material.module";
import { PipesModule } from "../Pipes/pipes.module";

@NgModule({
    declarations: [],
    imports: [
        AngularMaterialModule,
        PipesModule
    ],
    exports: [],
})
export class ComponentsModule {}