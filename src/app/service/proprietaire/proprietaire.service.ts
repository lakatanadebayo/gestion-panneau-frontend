import { Injectable } from '@angular/core';
import {Global} from "../../../global";
import {HttpClient} from "@angular/common/http";
import {Proprietaire} from "../../entity/Proprietaire";
import {Observable} from "rxjs";
import {User} from "../../entity/User";

@Injectable({
  providedIn: 'root'
})
export class ProprietaireService {

  baseUrl = Global.baseUrl;

  constructor(private httpClient : HttpClient) { }

  save(proprietaire: Proprietaire): Observable<any> {
    return this.httpClient.post(this.baseUrl+"/proprietaire/save", proprietaire)
  }

  update(id: any, proprietaire: Proprietaire): Observable<any> {
    return this.httpClient.put(this.baseUrl+"/proprietaire/update/"+id, proprietaire)
  }

  getAll(): Observable<any> {
    return this.httpClient.get(this.baseUrl+"/proprietaire/all")
  }

  getById(id: any): Observable<any> {
    return this.httpClient.get(this.baseUrl+"/proprietaire/"+id)
  }

  getByUser(user: User): Observable<any> {
    return this.httpClient.post(this.baseUrl+"/proprietaire/findbyuser", user)
  }
}
