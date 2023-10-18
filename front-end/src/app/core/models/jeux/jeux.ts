import { Ijeux } from "../../interfaces/ijeux";

export class Jeux implements Ijeux{
        id_employe: number;
        date_debut: Date;
        Date_fin: Date;
        nbr_ticket: number;
        statut: string;

        constructor(id_employe : number, debut: Date, fin: Date, nombre:number, statut: string){
            this.id_employe  = id_employe;
            this.date_debut = debut;
            this.Date_fin = fin;
            this.nbr_ticket = nombre;
            this.statut = statut
        }
}
