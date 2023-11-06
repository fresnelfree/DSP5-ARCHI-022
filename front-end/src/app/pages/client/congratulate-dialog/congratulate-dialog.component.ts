import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientGainComponent } from '../client-gain/client-gain.component';
export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-congratulate-dialog',
  templateUrl: './congratulate-dialog.component.html',
  styleUrls: ['./congratulate-dialog.component.css']
})
export class CongratulateDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CongratulateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
