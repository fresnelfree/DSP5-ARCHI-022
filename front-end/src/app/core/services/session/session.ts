import { Client } from "../client/client";
import { Repartition } from "../repartition/repartition";

export interface Session {
  id?: number;
  libelle: string;
  id_employe:number;
  date_debut: string;
  date_fin: string;
  nbr_ticket: number;
  statut: string;
  repartitions?:Repartition[];
  client?: Client[]
}
