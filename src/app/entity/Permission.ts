import {ResourceEnum} from "../enum/ResourceEnum";
import {ActionEnum} from "../enum/ActionEnum";

export class Permission {
  constructor(
    public id: any,
    public libelle: string,
    public resourceEnum: ResourceEnum,
    public actionEnum: ActionEnum,
    public dateCreation: string,
    public codeUtilisateurCreation: string,
    public dateModification: string,
    public codeUtilisateurModification: string,
    public isDeleted?: boolean) {
  }
}
