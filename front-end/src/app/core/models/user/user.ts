import { Iuser } from "../../interfaces/iuser";

export class User implements Iuser {
    
    id     : number;
    nom    : string;
    prenom : string;
    email  : string;
    tel    : string;
    adresse: string;
      
    constructor( id : number, nom: string, prenom : string, email  : string, tel    : string, adresse: string) {
                this.id      = id;
                this.nom     = nom;
                this.prenom  =  prenom;
                this.email   = email;
                this.tel     = tel;
                this.adresse = adresse
        }
    
}
