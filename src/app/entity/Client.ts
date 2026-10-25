import {User} from "./User";
import {Location} from "./Location";

export class Client {
  constructor(
    public id: any,
    public user: User,
    public locations: Location[],
    public dateCreation: string,
    public codeUtilisateurCreation: string,
    public dateModification: string,
    public codeUtilisateurModification: string,
    public isDeleted?: boolean
  ) {
  }
}
