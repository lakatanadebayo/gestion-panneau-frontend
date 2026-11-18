import {Role} from "../entity/Role";

export class UserDto {
  constructor(public id: any, public titre: string, public nom: string, public prenom: string, public dateNaissance: string, public adresse : string,
              public idPays: number, public ville: string, public codePostal: string, public email: string, public telephone: string,
              public username: string, public password: string, public photo: string, public state: string, public roles: Role[],
              public ajoutCompteClient?: boolean, public ajouteCompteProprietaire?: boolean, public isDeleted?: boolean) {}
}
