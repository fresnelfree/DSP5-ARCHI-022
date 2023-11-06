import { Iuser } from "../../interfaces/iuser";

export class User implements Iuser {
        id?: number;
        nom    : string;
        prenom : string;
        email  : string;
        tel    : string;
        adresse: string;
        role:string;
    
        constructor(nom: string, prenom : string, email  : string, tel    : string, adresse: string, role:string) {
                    this.nom     = nom;
                    this.prenom  =  prenom;
                    this.email   = email;
                    this.tel     = tel;
                    this.adresse = adresse;
                    this.role    =  role;   
            }
}
