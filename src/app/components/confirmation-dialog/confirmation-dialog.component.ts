import { Component, Inject } from '@angular/core';
import { IDialogConfirmationData } from '../../interfaces/dialog-confirmation-data.interface';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss'
})
export class ConfirmationDialogComponent {
 constructor(@Inject(MAT_DIALOG_DATA) public data: IDialogConfirmationData) {}
}
