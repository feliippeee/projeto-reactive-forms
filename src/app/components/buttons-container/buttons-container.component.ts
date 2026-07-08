import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-buttons-container',
  templateUrl: './buttons-container.component.html',
  styleUrl: './buttons-container.component.scss'
})
export class ButtonsContainerComponent {
  @Input({ required: true }) isInEditMode: boolean = false; // Input obrigatório para determinar se o modo de edição está ativo ou não

  @Output('onEditButton') onEditButtonEmitt = new EventEmitter<void>(); // void dispara o evento sem passar nenhum valor
  @Output('onCancelButton') onCancelButtonEmitt = new EventEmitter<void>();

  
  onCancelButton() {
    this.onCancelButtonEmitt.emit(); 
  }
  onEditButton() {
    this.onEditButtonEmitt.emit(); 
  }

}