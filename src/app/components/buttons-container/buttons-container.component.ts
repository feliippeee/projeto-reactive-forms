import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-buttons-container',
  templateUrl: './buttons-container.component.html',
  styleUrl: './buttons-container.component.scss'
})
export class ButtonsContainerComponent {
  @Input({ required: true }) isInEditMode: boolean = false; // Input obrigatório para determinar se o modo de edição está ativo ou não
  @Input({ required: true }) enableSaveButton: boolean = false; // Input obrigatório para determinar se o botão de salvar deve estar habilitado ou não

  @Output('onSaveButton') onSaveButtonEmitt = new EventEmitter<void>();
  @Output('onEditButton') onEditButtonEmitt = new EventEmitter<void>(); // void dispara o evento sem passar nenhum valor
  @Output('onCancelButton') onCancelButtonEmitt = new EventEmitter<void>();

  onSaveButton() {
    this.onSaveButtonEmitt.emit();
  }

  onCancelButton() {
    this.onCancelButtonEmitt.emit(); 
  }
  onEditButton() {
    this.onEditButtonEmitt.emit(); 
  }

}