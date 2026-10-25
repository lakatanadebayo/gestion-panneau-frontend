import {Proprietaire} from "./Proprietaire";
import {LocationPanneau} from "./LocationPanneau";

export class Panneau {
  constructor(
    public id: any,
    public emplacement: string,
    public locationPanneaux: LocationPanneau[],
    public proprietaire: Proprietaire,
    public dateCreation: string,
    public codeUtilisateurCreation: string,
    public dateModification: string,
    public codeUtilisateurModification: string,
    public isDeleted?: boolean
  ) {
  }
}
