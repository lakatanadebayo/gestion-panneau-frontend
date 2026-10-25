import { Injectable } from '@angular/core';
import {Global} from "../../../global";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../entity/User";
import {LoginRequest} from "../../entity/LoginRequest";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = Global.baseUrl;

  constructor(private httpClient : HttpClient) { }

  save(user: User): Observable<any> {
    return this.httpClient.post(this.baseUrl+"/user/save", user)
  }

  update(id: number, user: User): Observable<any> {
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
}
