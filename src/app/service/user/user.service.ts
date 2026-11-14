import {Injectable} from '@angular/core';
import {Global} from "../../../global";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoginRequest} from "../../entity/LoginRequest";
import {FindByUsername} from "../../entity/FindByUsername";
import {UserDto} from "../../entity/UserDto";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = Global.baseUrl;

  constructor(private httpClient : HttpClient) { }

  save(user: UserDto): Observable<any> {
    return this.httpClient.post(this.baseUrl+"/user/save", user)
  }

  update(id: number, user: UserDto): Observable<any> {
    return this.httpClient.put(this.baseUrl+"/user/update/"+id, user)
  }

  getAll(): Observable<any> {
    return this.httpClient.get(this.baseUrl+"/user/all")
  }

  getById(id: number): Observable<any> {
    return this.httpClient.get(this.baseUrl+"/user/"+id)
  }

  login(loginRequest: LoginRequest): Observable<any> {
    return this.httpClient.post(this.baseUrl+"/user/authentication", loginRequest)
  }

  findByUsername(findByUsername: FindByUsername): Observable<any> {
    return this.httpClient.post(this.baseUrl+"/user/check-username", findByUsername)
  }
}
