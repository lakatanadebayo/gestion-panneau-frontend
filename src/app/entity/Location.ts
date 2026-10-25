import {Client} from "./Client";
import {LocationPanneau} from "./LocationPanneau";

export class Location {
  constructor(
    public id: any,
    public dateLocation: string,
    public client: Client,
    public montantLocation: number,
    public locationPanneaux: LocationPanneau[],
    public dateCreation: string,
    public codeUtilisateurCreation: string,
    public dateModification: string,
    public codeUtilisateurModification: string,
    public isDeleted?: boolean
  ) {
  }
}
