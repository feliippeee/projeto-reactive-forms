import { NgModule } from "@angular/core";
import { MaritalStatusPipe } from './marital-status.pipe';
import { CpfPipe } from './cpf.pipe';
import { PhoneMaskPipe } from './phone-mask.pipe';

@NgModule({
    declarations: [
    MaritalStatusPipe,
    CpfPipe,
    PhoneMaskPipe
  ],
    exports: [
      MaritalStatusPipe,
      CpfPipe,
      PhoneMaskPipe,
    ],
 })
export class PipesModule {}