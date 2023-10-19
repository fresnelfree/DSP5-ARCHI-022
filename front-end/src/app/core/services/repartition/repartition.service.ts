import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repartition } from './repartition';
import { environment } from 'src/environments/environment.dev';

//Hedaer Option
const httpOption = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
  })
};
@Injectable({
  providedIn: 'root'
})
export class RepartitionService {

  constructor(
    private http: HttpClient
  ) {

   }

   AddNewParticipationGains(data:Repartition[]):any {
    console.log('dataSend : ', data);

    return this.http.post(`${environment.hostLocal}/repartitions`,data,httpOption)
   }

  generateUniqueNumbers(min:number, max:number, count:number,uniqCode:number) {
    if (max - min + 1 < count) {
      throw new Error("La plage ne contient pas suffisamment de chiffres uniques.");
    }

    const uniqueNumbers = new Set();
    while (uniqueNumbers.size < count) {
      const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
      uniqueNumbers.add("S"+uniqCode+this.standardNumber(randomNum,max));
    }
    console.log("uniqueNumbers: ",Array.from(uniqueNumbers))
    return Array.from(uniqueNumbers);
  }

  standardNumber(val:number,maxVal:number) {
    let numberString = ""
    const max = maxVal.toString().length - val.toString().length
    for (let index = 0; index < max; index++) {
        numberString = numberString +""+0
    }
    return numberString+val
  }
}
