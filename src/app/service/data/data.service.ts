import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {User} from "../../entity/User";
import {Role} from "../../entity/Role";
import {Client} from "../../entity/Client";
import {Proprietaire} from "../../entity/Proprietaire";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private isUpdateProcess = new BehaviorSubject<boolean>(false);
  isUpdateProcess$ = this.isUpdateProcess.asObservable();

  private authStatus = new BehaviorSubject<boolean>(false);
  authStatus$ = this.authStatus.asObservable();

  private username = new BehaviorSubject<string>('test');
  username$ = this.username.asObservable();

  private user = new BehaviorSubject<User | null>(null);
  user$ = this.user.asObservable();

  private client = new BehaviorSubject<Client | null>(null);
  client$ = this.client.asObservable();

  private proprietaire = new BehaviorSubject<Proprietaire | null>(null);
  proprietaire$ = this.proprietaire.asObservable();

  private userRoles = new BehaviorSubject<Role[]>([]);
  userRoles$ = this.userRoles.asObservable();

  setIsUpdateProcess(isUpdateProcess: boolean) {
    this.isUpdateProcess.next(isUpdateProcess);
  }

  setAuthStatus(authStatus: boolean) {
    this.authStatus.next(authStatus);
  }

  setUsername(username: string) {
    this.username.next(username);
  }

  setUser(user: User | null) {
    this.user.next(user);
  }

  setClient(client: Client | null) {
    this.client.next(client);
  }

  setProprietaire(proprietaire: Proprietaire | null) {
    this.proprietaire.next(proprietaire);
  }

  setUserRoles(roles: Role[]) {
    this.userRoles.next(roles);
  }
}
