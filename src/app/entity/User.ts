import {Role} from "./Role";
import {Pays} from "./Pays";

export class User {
  constructor(
    public id: any,
    public titre: string,
    public nom: string,
    public prenom: string,
    public dateNaissance: string,
    public adresse: string,
    public pays: Pays,
    public ville: string,
    public codePostal: string,
    public email: string,
    public telephone: string,
    public username: string,
    public password: string,
    public photo: string,
    public state: string,
    public roles: Role[],
    public dateCreation: string,
    public codeUtilisateurCreation: string,
    public dateModification: string,
    public codeUtilisateurModification: string,
    public isDeleted?: boolean
  ) {
  }
}
