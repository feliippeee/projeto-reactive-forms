import { Component, OnInit } from '@angular/core';
import { UsersService } from './services/users.service';
import { UsersListResponse } from './types/users-list-response';
import { take } from 'rxjs';
import { IUser } from './interfaces/user/user.interface';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { IDialogConfirmationData } from './interfaces/dialog-confirmation-data.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
isInEditMode: boolean = false;
enableSaveButton: boolean = false;
userFormUpdated: boolean = false;

  userSelectedIndex: number | undefined;
  userSelected: IUser = {} as IUser; // criando um clone do usuário selecionado
  
  usersList: UsersListResponse = [];

  constructor(
    private readonly _usersService: UsersService,
    private readonly _matDialog: MatDialog, 
  ) { }

  ngOnInit() {
    this._usersService.getUsers().pipe(take(1)).subscribe((usersListResponse) => this.usersList = usersListResponse);
  }
  
  onUserSelected(userIndex: number) {
    const userFound = this.usersList[userIndex];

    if (userFound) {
      this.userSelectedIndex = userIndex;
      this.userSelected = structuredClone(userFound); // criando um clone do usuário selecionado
     
    }
  }

  onCancelButton() {
    if(this.userFormUpdated) {
      this.openConfirmationDialog({
          title: 'O Formulário foi alterado',
          message: 'Deseja realmente cancelar as alterações feitas no formulário?'
        }, 
        (value: boolean) => {
          if(!value) return;

          this.isInEditMode = false;
          this.userFormUpdated = false;
        } 
      );
    } else {
      this.isInEditMode = false;
    }
  }

  onSaveButton() {
   this.openConfirmationDialog(
    {
      title: 'Confirmar alteração de dados',
      message: 'Deseja realmente salvar os valores alterados no formulário?'
    }, 
    (value: boolean) => {
      if(!value) return;

      this.saveUserInfos();

      this.isInEditMode = false;
      this.userFormUpdated = false;
    }
   );
  }
  
  onEditButton() {
    this.isInEditMode = true;
  }

  onFormStatusChange(formStatus: boolean) {
    setTimeout(() => this.enableSaveButton = formStatus, 0); // Atualizando o estado do botão de salvar com base na validade do formulário
  }// nesse caso, o setTimeout é usado para garantir que a atualização do estado do botão de salvar ocorra após a conclusão do ciclo de detecção de mudanças do Angular, evitando possíveis problemas de sincronização.
  onUserFormFirstChange() {
    this.userFormUpdated = true; // Atualizando o estado para indicar que o formulário do usuário foi atualizado
  }

  private openConfirmationDialog(data: IDialogConfirmationData, callback: (value: boolean) => void) {
     const dialogRef =this._matDialog.open(ConfirmationDialogComponent, {
        data,
      });

      dialogRef.afterClosed().subscribe(callback);
  }
  
  private saveUserInfos() {
    console.log('Valores Alterados');
  }   
}