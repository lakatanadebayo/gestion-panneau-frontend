import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {User} from "../../entity/User";

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

  private user = new BehaviorSubject<string>('test');
  user$ = this.user.asObservable();

  setIsUpdateProcess(isUpdateProcess: boolean) {
    this.isUpdateProcess.next(isUpdateProcess);
  }

  setAuthStatus(authStatus: boolean) {
    this.authStatus.next(authStatus);
  }

  setUsername(username: string) {
    this.username.next(username);
  }

  setUser(user: User) {
    this.username.next(user);
  }
}
