import {Injectable} from '@angular/core';
import {Global} from "../../../global";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Panneau} from "../../entity/Panneau";

@Injectable({
  providedIn: 'root'
})
export class PanneauService {

  baseUrl = Global.baseUrl;

  constructor(private httpClient : HttpClient) { }

  save(panneau: Panneau): Observable<any> {
    return this.httpClient.post(this.baseUrl+"/panneau/save", panneau)
  }

  update(id: number, panneau: Panneau): Observable<any> {
    return this.httpClient.put(this.baseUrl+"/panneau/update/"+id, panneau)
  }

  getAll(): Observable<any> {
    return this.httpClient.get(this.baseUrl+"/panneau/all")
  }

  getById(id: number): Observable<any> {
    return this.httpClient.get(this.baseUrl+"/panneau/"+id)
  }

}
