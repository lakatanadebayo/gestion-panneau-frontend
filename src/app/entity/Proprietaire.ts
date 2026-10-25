import {User} from "./User";
import {Panneau} from "./Panneau";

export class Proprietaire {
  constructor(
    public id: any,
    public user: User,
    public panneaux: Panneau[],
    public dateCreation: string,
    public codeUtilisateurCreation: string,
    public dateModification: string,
    public codeUtilisateurModification: string,
    public isDeleted?: boolean
  ) {
  }
}
