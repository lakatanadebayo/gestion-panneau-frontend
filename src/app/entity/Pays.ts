export class Pays {
  constructor(
    public id: any,
    public nom: string,
    public code: string,
    public isoCode: string,
    public dateCreation: string,
    public codeUtilisateurCreation: string,
    public dateModification: string,
    public codeUtilisateurModification: string,
    public isDeleted?: boolean) {
  }
}
