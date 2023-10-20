export class Client {
    id_compte: number;
    nom    : string;
    prenom : string;
    email  : string;
    tel    : string;
    adresse: string;
  
    constructor(id_compte:number, nom: string, prenom : string, email  : string, tel    : string, adresse: string) {
                this.nom     = nom;
                this.prenom  =  prenom;
                this.email   = email;
                this.tel     = tel;
                this.adresse = adresse; 
                this.id_compte = id_compte;
        }
}
