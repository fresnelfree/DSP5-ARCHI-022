import { Gain } from "../../models/gain/gain";

export interface Repartition {
  id?: number;
  id_session:number;
  pourcentage:number;
  libelle:string;
  gains?:Gain[]
}

