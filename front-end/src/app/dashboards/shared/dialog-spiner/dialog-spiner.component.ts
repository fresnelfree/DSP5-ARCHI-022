import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-spiner',
  templateUrl: './dialog-spiner.component.html',
  styleUrls: ['./dialog-spiner.component.css']
})
export class DialogSpinerComponent {
  
  constructor(
    public dialogRef: MatDialogRef<DialogSpinerComponent>,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
