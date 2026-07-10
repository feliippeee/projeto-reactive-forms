import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IUser } from '../../interfaces/user/user.interface';

@Component({
  selector: 'app-user-informations-container',
  templateUrl: './user-informations-container.component.html',
  styleUrl: './user-informations-container.component.scss'
})
export class UserInformationsContainerComponent implements OnChanges { // Implementando a interface OnChanges para detectar mudanças nas propriedades de entrada (Input)
  
  currentTabIndex = 1; // resetando o índice da aba para a primeira aba (Geral) ao selecionar um novo usuário
  @Input({ required: true }) isInEditMode: boolean = false; // Input obrigatório para determinar se o modo de edição está ativo ou não
  @Input({ required: true }) userSelected: IUser = {} as IUser; // Input obrigatório para determinar se o modo de edição está ativo ou não
  ngOnChanges(_: SimpleChanges): void {
      this.currentTabIndex = 1; // resetando o índice da aba para a primeira aba (Geral) ao selecionar um novo usuário
  }
}
