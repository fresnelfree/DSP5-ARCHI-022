import { Gain } from "../gain/gain";

export interface Client {
  id?: number;
  nom: string;
  prenom: string;
  tel: string;
  id_compte: number;
  email: string;
  adresse: string;
  gains: Gain[];
}
