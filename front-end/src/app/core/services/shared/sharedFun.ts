import { Injectable } from "@angular/core"

@Injectable({
  providedIn: 'root'
})
export class SharedFun {

  constructor() { }

  FormatDate(date:string): string {
    // Utilisez les méthodes de l'objet Date pour extraire les composants de la date
    const dateConvert = new Date(date)
    const year = dateConvert.getFullYear();
    const month = String(dateConvert.getMonth() + 1).padStart(2, '0'); // Le mois est basé sur zéro, alors ajoutez 1
    const day = String(dateConvert.getDate()).padStart(2, '0');
    const hours = String(dateConvert.getHours()).padStart(2, '0');
    const minutes = String(dateConvert.getMinutes()).padStart(2, '0');
    const seconds = String(dateConvert.getSeconds()).padStart(2, '0');
    const milliseconds = String(dateConvert.getMilliseconds()).padStart(3, '0');

    // Créez la chaîne de date au format souhaité
    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
    console.log("date: ", formattedDate)
    return formattedDate
  }

}
