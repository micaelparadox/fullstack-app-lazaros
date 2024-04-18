import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  template: `
  <h1 mat-dialog-title>{{ data.title }}</h1>
  <div mat-dialog-content>{{ data.message }}</div>
  <div mat-dialog-actions>
    <button mat-button [mat-dialog-close]="true" class="confirm-button">Sim</button>
    <button mat-button [mat-dialog-close]="false" class="cancel-button">Não</button>
  </div>
`,
styles: [`
    .confirm-button {
      background-color: #4CAF50;
      color: white;
      border: none; 
      cursor: pointer;
      padding: 10px 20px;
      border-radius: 4px;
      margin-right: 8px;
    }
    .cancel-button {
      background-color: #f44336;
      color: white;
      border: none; 
      cursor: pointer;
      padding: 10px 20px;
      border-radius: 4px;
    }
    .confirm-button:hover, .cancel-button:hover {
      opacity: 0.8;
    }
  `],
  standalone: true,
  imports: [MatDialogModule]
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string }
  ) {}
}
