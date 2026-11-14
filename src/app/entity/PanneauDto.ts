import {Proprietaire} from "./Proprietaire";
import {LocationPanneau} from "./LocationPanneau";

export class PanneauDto {
  constructor(
    public id: any,
    public emplacement: string,
    public idProprietaire: any,
    /*public dateCreation: string,
    public codeUtilisateurCreation: string,
    public dateModification: string,
    public codeUtilisateurModification: string,
    public isDeleted?: boolean*/
  ) {
  }
}
