import {Injectable} from '@angular/core';
import {Global} from "../../../global";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Client} from "../../entity/Client";
import {UserId} from "../../entity/UserId";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  baseUrl = Global.baseUrl;

  constructor(private httpClient : HttpClient) { }

  save(client: Client): Observable<any> {
    return this.httpClient.post(this.baseUrl+"/client/save", client)
  }

  update(id: any, client: Client): Observable<any> {
    return this.httpClient.put(this.baseUrl+"/client/update/"+id, client)
  }

  getAll(): Observable<any> {
    return this.httpClient.get(this.baseUrl+"/client/all")
  }

  getById(id: any): Observable<any> {
    return this.httpClient.get(this.baseUrl+"/panneau/"+id)
  }

  getByUserId(userId: UserId): Observable<any> {
    return this.httpClient.post(this.baseUrl+"/client/findbyuser", userId)
  }
}
