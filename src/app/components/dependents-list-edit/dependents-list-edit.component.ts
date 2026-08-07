import { Component, Input } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dependents-list-edit',
  templateUrl: './dependents-list-edit.component.html',
  styleUrl: './dependents-list-edit.component.scss'
})
export class DependentsListEditComponent {
  @Input({ required: true}) userForm!: FormGroup;

  get dependentsList(): FormArray {
    return this.userForm.get('dependentsList') as FormArray;
  }
}
