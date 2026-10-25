import {Location} from "./Location";
import {Panneau} from "./Panneau";

export class LocationPanneau {
  constructor(
    public id: any,
    public location: Location,
    public panneau: Panneau,
    public dateDebut: string,
    public dateFin: string,
    public montantLigne: number,
    public dateCreation: string,
    public codeUtilisateurCreation: string,
    public dateModification: string,
    public codeUtilisateurModification: string,
    public isDeleted?: boolean
  ) {
  }
}
