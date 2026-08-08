import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UsersListResponse } from '../../types/users-list-response';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {
  userSelectedIndex: number | undefined;
  @Input({ required: true }) usersList: UsersListResponse = []; // Propriedade de entrada para receber a lista de usuários do componente pai
  @Input({ required: true }) isInEditMode: boolean = false; // Propriedade de entrada para receber o estado de edição do componente pai

  @Output('OnUserSelected') onUserSelectedEmitt = new EventEmitter<number>();

  onUserSelected(userindex: number) {
    if(this.isInEditMode) return; // Se estiver em modo de edição, não permitir a seleção de outro usuário
    
    this.userSelectedIndex = userindex;
    this.onUserSelectedEmitt.emit(userindex);
  }
}
