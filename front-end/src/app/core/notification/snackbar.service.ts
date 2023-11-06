import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotifyComponent } from 'src/app/shared/notify/notify.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  showNotification(message: string, action: string = 'Fermer', messageType: 'error' | 'success' | 'warning' | 'info') {
    this.snackBar.open(message, action, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: [messageType], // Utilisez la classe CSS personnalisée ici
      duration: 3000, // Durée d'affichage en millisecondes (3 secondes dans cet exemple)
    });
    
  }

  // showNotification(displayMessage: string, buttonText: string, messageType: 'error' | 'success' | 'warning') {
  //   this.snackBar.openFromComponent(NotifyComponent, {
  //     data: {
  //       message: displayMessage,
  //       buttonText: buttonText,
  //       type: messageType
  //     },
  //     duration: 5000,
  //     horizontalPosition: 'center',
  //     verticalPosition: 'bottom',
  //     panelClass: 'error.mat-snack-bar-container'
  //   });
  // }
}
