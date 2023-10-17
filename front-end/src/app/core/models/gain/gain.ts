export class Gain {
    id             : number;
    id_repartition : number;
    id_client      : number;
    libelle_gain   : string;
    numero_gain    : number;
    etat_gain      : string;

    constructor() {
                this.id             = 0;
                this.id_repartition = 0;
                this.id_client      = 0;
                this.libelle_gain   = "vide";
                this.numero_gain    = 0;
                this.etat_gain      = "vide";
        }
}

