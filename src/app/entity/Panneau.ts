import {Proprietaire} from "./Proprietaire";
import {Pays} from "./Pays";

export class Panneau {
  constructor(
    public id: any,
    public adresse: string,
    public ville: string,
    public pays: Pays,
    public proprietaire: Proprietaire,
    public dateCreation: string,
    public codeUtilisateurCreation: string,
    public dateModification: string,
    public codeUtilisateurModification: string,
    public isDeleted?: boolean
  ) {
  }
}
