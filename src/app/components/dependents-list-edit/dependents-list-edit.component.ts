import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dependents-list-edit',
  templateUrl: './dependents-list-edit.component.html',
  styleUrl: './dependents-list-edit.component.scss'
})
export class DependentsListEditComponent {
  @Input({ required: true}) userForm!: FormGroup;
  
  @Output('onAddDependent') onAddDependentEmitt = new EventEmitter<void>(); // Emitindo o evento para adicionar um novo dependente
  @Output('onRemoveDependent') onRemoveDependentEmitt = new EventEmitter<number>(); // Emitindo o evento para remover um dependente com base no índice fornecido

  get dependentsList(): FormArray {
    return this.userForm.get('dependentsList') as FormArray;
  }

  addDependent() {
    this.onAddDependentEmitt.emit(); // Emitindo o evento para adicionar um novo dependente
  }

  removeDependent(dependentIndex: number) {
    this.onRemoveDependentEmitt.emit(dependentIndex); // Emitindo o evento para remover o dependente com base no índice fornecido
  }

}
