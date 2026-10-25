import {Permission} from "./Permission";

export class Role {
  constructor(
    public id: any,
    public libelle: string,
    public permissions: Permission[],
    public dateCreation: string,
    public codeUtilisateurCreation: string,
    public dateModification: string,
    public codeUtilisateurModification: string,
    public isDeleted?: boolean) {
  }
}
